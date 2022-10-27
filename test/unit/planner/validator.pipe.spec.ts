import { faker as F } from '@faker-js/faker';
import moment from 'moment';
import { PastDatePipe } from 'planner/pipes';

describe('RoleValidatorPipe', () => {
	let pipe: PastDatePipe;

	beforeAll(async () => {
		pipe = new PastDatePipe();
	});

	it('should be defined', () => {
		expect(pipe).toBeDefined();
	});

	describe('when is past date', () => {
		it('should return false', async () => {
			const result = await pipe.validate(F.date.past().toISOString());
			expect(result).toBe(false);
		});
	});

	describe('when is present date', () => {
		it('should return false', async () => {
			const result = await pipe.validate(moment().toISOString());
			expect(result).toBe(true);
		});
	});

	describe('when is future date', () => {
		it('should return false', async () => {
			const result = await pipe.validate(F.date.soon().toISOString());
			expect(result).toBe(true);
		});
	});
});
