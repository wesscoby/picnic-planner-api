import { ApiProperty } from '@nestjs/swagger';
import { faker as F } from '@faker-js/faker';
import moment from 'moment';

export class OptimalDayEntity {
	@ApiProperty({ example: moment(F.date.soon()).format('YYYY-MM-DD') })
	date!: string;

	@ApiProperty({ example: F.address.city() })
	location!: string;

	constructor({ date, location }: OptimalDayEntity) {
		this.date = date;
		this.location = location;
	}
}
