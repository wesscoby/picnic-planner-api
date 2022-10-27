export interface WeatherResult {
	weather: Weather[];
	sources: Source[];
}

export interface Source {
	id: number;
	dwd_station_id: string;
	observation_type: string;
	lat: number;
	lon: number;
	height: number;
	station_name: string;
	wmo_station_id: string;
	first_record: Date;
	last_record: Date;
	distance: number;
}

export interface Weather {
	timestamp: Date;
	source_id: number;
	precipitation: number;
	pressure_msl: number;
	sunshine: number | null;
	temperature: number;
	wind_direction: number;
	wind_speed: number;
	cloud_cover: number;
	dew_point: number;
	relative_humidity: number;
	visibility: number;
	wind_gust_direction: number | null;
	wind_gust_speed: number;
	condition: string;
	fallback_source_ids?: FallbackSourceIDS;
	icon: string;
}

export interface FallbackSourceIDS {
	cloud_cover: number;
	pressure_msl: number;
	wind_gust_speed: number;
	visibility: number;
	wind_speed: number;
	wind_direction: number;
}

export interface ForecastParams {
	from: string;
	to: string;
	latitude: number;
	longitude: number;
}
