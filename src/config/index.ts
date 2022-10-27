import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
const { env } = process;

/**
 * Config Namespace containing environment variable definitions
 * and associated validation schema, and a custom ConfigService
 * for easier usage
 */
namespace Config {
	export interface APP {
		name: string;
		env: string;
		host: string;
		appHost: string;
		port: number;
	}

	export interface ENV {
		app: APP;
		geocoderApiKey: string;
		brightSkyApiUrl: string;
	}

	export const schema = Joi.object({
		APP_NAME: Joi.string().required(),
		APP_ENV: Joi.string()
			.valid('development', 'production', 'test')
			.default('development')
			.required(),
		SERVER_HOST: Joi.string().required(),
		APP_HOST: Joi.string().required(),
		PORT: Joi.number().default(5000).required(),
		GEOCODER_API_KEY: Joi.string().required(),
		BRIGHT_SKY_API_URL: Joi.string().required(),
	});

	export const getVariables = (): ENV => ({
		app: {
			name: env.APP_NAME || '',
			env: env.APP_ENV || 'development',
			host: env.SERVER_HOST || '',
			appHost: env.APP_HOST || '',
			port: Number(env.PORT) || 5000,
		},
		geocoderApiKey: env.GEOCODER_API_KEY || '',
		brightSkyApiUrl: env.BRIGHT_SKY_API_URL || '',
	});

	@Injectable()
	export class Service {
		constructor(private readonly config: ConfigService<Config.ENV, true>) {}

		get app() {
			return this.config.get('app', { infer: true });
		}

		get geocoderApiKey() {
			return this.config.get('geocoderApiKey', { infer: true });
		}

		get brightSkyApiUrl() {
			return this.config.get('brightSkyApiUrl', { infer: true });
		}
	}
}

export default Config;
