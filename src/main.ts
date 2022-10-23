import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import Config from 'config';
import { SWAGGER_OPTIONS } from 'common/constants';
import * as setup from 'app.setup';
import { AppModule } from 'app.module';

async function bootstrap() {
	const logger = new Logger('Bootstrap');
	const app = await NestFactory.create(AppModule);

	setup.enableVersioning(app);
	// setup.setStatic(app);
	setup.useGlobalPipes(app);
	setup.useGlobalInterceptors(app);

	const config = app.get(Config.Service);
	const { port, appHost } = config.app;

	const document = SwaggerModule.createDocument(app, SWAGGER_OPTIONS, {
		ignoreGlobalPrefix: true,
	});
	SwaggerModule.setup('/docs', app, document, {
		customSiteTitle: 'API Starter',
		customCssUrl: '/css/theme-flattop.css',
	});

	setup.enableCors(app);
	setup.enableHelmet(app);

	await app.listen(port);
	logger.log(`Application listening on http://${appHost}:${port}`);
	logger.log(`API Documentation available on http://${appHost}:${port}/docs`);
}
bootstrap();
