import { NotFoundException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Geocoder from 'node-geocoder';
import moment from 'moment';
import Config from 'config';
import { PartyPlanDto } from './dto';
import { WeatherResult, ForecastParams } from './types';
import { OptimalDayEntity } from './entity';

@Injectable()
export class PlannerService {
	readonly geocoder: Geocoder.Geocoder;

	constructor(
		private readonly config: Config.Service,
		private readonly http: HttpService,
	) {
		this.geocoder = Geocoder({
			provider: 'opencage',
			apiKey: this.config.geocoderApiKey,
		});
	}

	async getForecast({
		from,
		to,
		latitude,
		longitude,
	}: ForecastParams): Promise<WeatherResult> {
		const response = await this.http.axiosRef.get<WeatherResult>(
			this.config.brightSkyApiUrl,
			{
				params: {
					date: from,
					last_date: to,
					lat: latitude,
					lon: longitude,
				},
			},
		);
		return response.data;
	}

	async getPartyPlan({ from, to, locations }: PartyPlanDto) {
		for (const location of locations) {
			const geocodeResults = await this.geocoder.geocode(location);
			if (geocodeResults.length === 0) {
				continue;
			}

			const forecastData = await this.getForecast({
				from,
				to: moment(to).add(1, 'day').toISOString(),
				latitude: geocodeResults[0].latitude!,
				longitude: geocodeResults[0].longitude!,
			});

			const optimalWeather = forecastData.weather.filter(
				(item) =>
					item.wind_speed < 30 &&
					item.temperature > 20 &&
					item.temperature < 30 &&
					item.precipitation < 0.1 &&
					item.sunshine &&
					item.sunshine > 10,
			);

			if (optimalWeather.length === 0) {
				continue;
			}

			return new OptimalDayEntity({
				date: moment(optimalWeather[0].timestamp).format('YYYY-MM-DD'),
				location,
			});
		}

		throw new NotFoundException(
			`No optimal day and location found between ${moment(from).format(
				'YYYY-MM-DD',
			)} and ${moment(to).format('YYYY-MM-DD')}`,
		);
	}
}
