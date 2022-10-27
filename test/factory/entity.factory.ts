import { Factory } from 'fishery';
import { faker as F } from '@faker-js/faker';
import moment from 'moment';
import { Entry } from 'node-geocoder';
import { OptimalDayEntity } from 'planner/entity';
import { Source, WeatherResult, Weather } from 'planner/types';

export default class Entity {
	static get optimalDay() {
		return Factory.define<OptimalDayEntity>(() => ({
			date: moment(F.date.soon()).format('YYYY-MM-DD'),
			location: F.address.city(),
		}));
	}

	static get weather() {
		return Factory.define<Weather>(() => {
			return {
				timestamp: F.date.soon(),
				source_id: 6007,
				cloud_cover: 0,
				condition: 'dry',
				dew_point: -2.5,
				icon: 'clear-night',
				precipitation: F.datatype.float(),
				pressure_msl: 1015.1,
				relative_humidity: 40,
				sunshine: F.datatype.number(),
				temperature: F.datatype.float(),
				visibility: 50000,
				wind_direction: 70,
				wind_speed: F.datatype.float(),
				wind_gust_direction: 50,
				wind_gust_speed: 33.5,
			};
		});
	}

	static get source() {
		return Factory.define<Source>(() => {
			return {
				id: 6007,
				dwd_station_id: '01766',
				wmo_station_id: '10315',
				station_name: 'Münster/Osnabrück',
				observation_type: 'historical',
				lat: 52.1344,
				lon: 7.6969,
				height: 47.8,
				distance: 16365,
				first_record: F.date.past(),
				last_record: F.date.recent(),
			};
		});
	}

	static get weatherResult() {
		return Factory.define<WeatherResult>(({ associations }) => {
			const weather =
				associations.weather ||
				F.helpers.uniqueArray<Weather>(
					() => Entity.weather.build(),
					F.datatype.number({ min: 5, max: 20 }),
				);

			const sources =
				associations.sources ||
				F.helpers.uniqueArray<Source>(
					() => Entity.source.build(),
					F.datatype.number({ min: 5, max: 20 }),
				);

			return {
				weather,
				sources,
			};
		});
	}

	static get entry() {
		return Factory.define<Entry>(({ associations }) => {
			const extra = associations.extra;

			return {
				latitude: Number(F.address.latitude()),
				longitude: Number(F.address.longitude()),
				extra,
			};
		});
	}
}
