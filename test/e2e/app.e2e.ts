import { SWAGGER_OPTIONS } from 'common/constants';
import { AppFactory } from '../factory';

describe('AppController (e2e)', () => {
	let app: AppFactory;

	beforeAll(async () => {
		app = await AppFactory.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Info [GET /]', () => {
		let status: number;
		let body: any;

		beforeAll(async () => {
			const response = await app.request.get('/');
			status = response.status;
			body = response.body;
		});

		it('should have 200 status', () => {
			expect(status).toBe(200);
		});

		it('should return object with app title and description', () => {
			const {
				info: { title, description },
			} = SWAGGER_OPTIONS;
			expect(body).toStrictEqual({ title, description });
		});
	});
});
