import {
	BadRequestException,
	ClassSerializerInterceptor,
	INestApplication,
	ValidationError,
	ValidationPipe,
	VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { CORS_OPTIONS } from 'common/constants';

export const enableVersioning = (app: INestApplication) => {
	app.enableVersioning({
		type: VersioningType.URI,
	});
};

// binds ValidationPipe to the entire application
export const useGlobalPipes = (app: INestApplication) => {
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			stopAtFirstError: true,
			exceptionFactory: (errors: ValidationError[] = []) => {
				if (errors.length === 0) {
					return new BadRequestException('Validation failed');
				}

				if (!errors[0].constraints) {
					return new BadRequestException('Validation failed');
				}

				const message = Object.values(errors[0].constraints).flat()[0];
				return new BadRequestException(`Validation: ${message}`);
			},
		}),
	);
};

// apply transform to all responses
export const useGlobalInterceptors = (app: INestApplication) => {
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
};

export const enableCors = (app: INestApplication) => {
	app.enableCors(CORS_OPTIONS);
};

export const enableHelmet = (app: INestApplication) => {
	app.use(helmet());
};
