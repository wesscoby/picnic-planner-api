import { DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

const port = process.env.PORT!;
const host = process.env.SERVER_HOST!;
const appHost = process.env.APP_HOST!;
const env = process.env.APP_ENV!;
const appName = process.env.APP_NAME!;

const DESCRIPTION =
	'API Documentation for Picnic Planner - an application which helps in choosing a date and location, based on optimal weather conditions, for hosting picnics';

const createDocumentBuilder = () => {
	const builder = new DocumentBuilder()
		.setTitle(appName)
		.setDescription(DESCRIPTION)
		.setVersion('1.0')
		.addTag('App')
		.addTag('Planner')
		.addBearerAuth();

	if (env === 'development') {
		builder
			.addServer(`http://localhost:${port}`, 'Local Development')
			.addServer(`http://${appHost}:${port}`, 'Dynamic Development');

		return builder.build();
	}

	builder.addServer(host, 'Production');
	return builder.build();
};

export const SWAGGER_OPTIONS = createDocumentBuilder();

export const CORS_OPTIONS = {
	origin: [
		'http://localhost:3000',
		'http://localhost:3001',
		'https://localhost:3000',
		'https://localhost:3001',
	],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 204,
};
