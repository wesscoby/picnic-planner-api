import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, Validate, IsString, IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import moment from 'moment';
import { PastDatePipe } from '../pipes';
import { IsValidDateRange } from '../decorators';
import { locationTransform } from '../util';

export class PartyPlanDto {
	@ApiProperty({ example: moment().format('YYYY-MM-DD') })
	@Validate(PastDatePipe)
	@IsISO8601({ strict: true })
	from!: string;

	@ApiProperty({ example: moment().add(2, 'days').format('YYYY-MM-DD') })
	@IsValidDateRange('from', { message: 'invalid date range [from - to]' })
	@Validate(PastDatePipe)
	@IsISO8601({ strict: true })
	to!: string;

	@ApiProperty({ type: String, isArray: true })
	@Type(() => String)
	@Transform(locationTransform)
	@IsNotEmpty({ each: true })
	@IsString({ each: true })
	locations!: string[];
}
