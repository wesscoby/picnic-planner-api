import moment from 'moment';
import { faker as F } from '@faker-js/faker';
import { AppFactory, Dto } from '../factory';

describe('PlannerController (e2e)', () => {
	let app: AppFactory;

	beforeAll(async () => {
		app = await AppFactory.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Party plan [GET /party_plan]', () => {
		describe('when FROM/TO is invalid ISO 8601 date', () => {
			it('should return 400 error', () => {
				return app.request
					.get('/party_plan')
					.query(Dto.partyPlan.build({ from: '2022-10-33' }))
					.expect(400);
			});
		});

		describe('when FROM/TO is past date', () => {
			it('should return 400 error', () => {
				return app.request
					.get('/party_plan')
					.query(Dto.partyPlan.build({ to: F.date.past().toISOString() }))
					.expect(400);
			});
		});

		describe('when TO < FROM', () => {
			it('should return 400 error', () => {
				return app.request
					.get('/party_plan')
					.query(
						Dto.partyPlan.build({
							from: moment().toISOString(),
							to: moment().subtract(2, 'days').toISOString(),
						}),
					)
					.expect(400);
			});
		});

		describe('when LOCATIONS is empty', () => {
			it('should return 400 error', () => {
				return app.request
					.get('/party_plan')
					.query(
						Dto.partyPlan.build({
							locations: undefined,
						}),
					)
					.expect(400);
			});
		});

		describe('when no geocode found for locations', () => {
			it('should return 404 error', () => {
				return app.request
					.get('/party_plan')
					.query(
						Dto.partyPlan.build({
							locations: ['###'],
						}),
					)
					.expect(404);
			});
		});

		// describe('otherwise', () => {
		// 	it('should return optimal date and location', () => {
		// 		return app.request
		// 			.get('/party_plan')
		// 			.query(
		// 				Dto.partyPlan.build({
		// 					from: moment().toISOString(),
		// 					to: moment().add(4, 'days').toISOString(),
		// 					locations: ['###', 'Treptower Park, Berlin'],
		// 				}),
		// 			)
		// 			.expect(200);
		// 	});
		// });
	});
});
