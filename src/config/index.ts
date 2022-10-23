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
	});

	export const getVariables = (): ENV => ({
		app: {
			name: env.APP_NAME || '',
			env: env.APP_ENV || 'development',
			host: env.SERVER_HOST || '',
			appHost: env.APP_HOST || '',
			port: Number(env.PORT) || 5000,
		},
	});

	@Injectable()
	export class Service {
		constructor(private readonly config: ConfigService<Config.ENV, true>) {}

		get app() {
			return this.config.get('app', { infer: true });
		}
	}
}

export default Config;
