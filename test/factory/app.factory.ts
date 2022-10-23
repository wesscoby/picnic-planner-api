import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { AppModule } from 'app.module';
import * as setup from 'app.setup';
import Config from 'config';

export default class AppFactory {
	private constructor(private readonly appInstance: INestApplication) {}

	get instance() {
		return this.appInstance;
	}

	get server() {
		return this.appInstance.getHttpServer();
	}

	get request() {
		return supertest(this.server);
	}

	get config() {
		return this.appInstance.get(Config.Service);
	}

	static async init() {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		const app = module.createNestApplication();

		setup.enableVersioning(app);
		setup.useGlobalPipes(app);
		setup.useGlobalInterceptors(app);
		setup.enableCors(app);
		setup.enableHelmet(app);

		await app.init();
		return new AppFactory(app);
	}

	async close() {
		await this.appInstance.close();
	}
}
