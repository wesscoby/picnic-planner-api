import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PlannerService } from 'planner/planner.service';
import Config from 'config';
import { Dto, Entity, Service } from '../../factory';
import { ExceptionNotThrownError } from '../../util';
import { NotFoundException } from '@nestjs/common';

describe('PlannerService', () => {
	let service: PlannerService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PlannerService, HttpService, Config.Service],
		})
			.overrideProvider(HttpService)
			.useValue(Service.Mock.http)
			.overrideProvider(Config.Service)
			.useValue(Service.Mock.config)
			.compile();

		service = module.get(PlannerService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getPartyPlan', () => {
		describe('when geocoder returns empty results for all locations', () => {
			it('should throw NotFoundException error', async () => {
				jest.spyOn(service.geocoder, 'geocode').mockResolvedValue([]);

				try {
					await service.getPartyPlan(Dto.partyPlan.build());
					throw new ExceptionNotThrownError();
				} catch (error) {
					expect(error).toBeInstanceOf(NotFoundException);
				}
			});
		});

		describe('otherwise', () => {
			describe('when no optimal weather found for all locations', () => {
				it('should throw NotFoundException error', async () => {
					jest
						.spyOn(service.geocoder, 'geocode')
						.mockResolvedValue(Entity.entry.buildList(1));
					jest
						.spyOn(service, 'getForecast')
						.mockResolvedValue(
							Entity.weatherResult.associations({ weather: [] }).build(),
						);

					try {
						await service.getPartyPlan(Dto.partyPlan.build());
						throw new ExceptionNotThrownError();
					} catch (error) {
						expect(error).toBeInstanceOf(NotFoundException);
					}
				});
			});

			describe('otherwise', () => {
				it('should return optimal date and location', async () => {
					jest
						.spyOn(service.geocoder, 'geocode')
						.mockResolvedValue(Entity.entry.buildList(1));
					jest.spyOn(service, 'getForecast').mockResolvedValue(
						Entity.weatherResult
							.associations({
								weather: [
									Entity.weather.build({
										precipitation: 0,
										temperature: 25,
										sunshine: 35,
										wind_speed: 25,
									}),
								],
							})
							.build(),
					);
					const result = await service.getPartyPlan(
						Dto.partyPlan.build({ locations: ['Treptower Park, Berlin'] }),
					);
					expect(result).not.toBeNull();
					expect(result.location).toBe('Treptower Park, Berlin');
				});
			});
		});
	});
});
