import { Test, TestingModule } from '@nestjs/testing';
import { OptimalDayEntity } from 'planner/entity';
import { PlannerController } from 'planner/planner.controller';
import { PlannerService } from 'planner/planner.service';
import { Service, Dto, Entity } from '../../factory';

describe('PlannerController', () => {
	let controller: PlannerController;
	let service: Service.Planner;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PlannerController],
			providers: [PlannerService],
		})
			.overrideProvider(PlannerService)
			.useValue(Service.Mock.planner)
			.compile();

		controller = module.get(PlannerController);
		service = module.get(PlannerService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getPartyPlan', () => {
		it('should return optimal date and location', async () => {
			service.getPartyPlan.mockResolvedValue(
				new OptimalDayEntity(
					Entity.optimalDay.build({ location: 'Treptower Park, Berlin' }),
				),
			);

			const result = await controller.getPartyPlan(Dto.partyPlan.build());
			expect(result).not.toBeNull();
			expect(result.location).toBe('Treptower Park, Berlin');
		});
	});
});
