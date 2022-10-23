import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import Config from 'config';
import { CustomConfigModule } from 'config/config.module';

describe('ConfigService', () => {
	const values = Config.getVariables();
	let service: Config.Service;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [CustomConfigModule],
			providers: [Config.Service, ConfigService],
		}).compile();

		service = module.get(Config.Service);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe.each(Object.keys(values))('%s', (key) => {
		it('should return the correct environment values', () => {
			expect(service[key]).toStrictEqual(values[key]);
		});
	});
});
