import { Test, TestingModule } from '@nestjs/testing';
import { SWAGGER_OPTIONS } from 'common/constants';
import { AppController } from 'app.controller';

describe('AppController', () => {
	let controller: AppController;

	beforeAll(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [],
		}).compile();

		controller = app.get(AppController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return app title and description', () => {
		const {
			info: { title, description },
		} = SWAGGER_OPTIONS;
		expect(controller.index()).toEqual({ title, description });
	});
});
