import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

/**
 * Check if specified date is present or future
 */
@ValidatorConstraint({ name: 'future_date' })
@Injectable()
export class PastDatePipe implements ValidatorConstraintInterface {
	/**
	 * validate method to validate provided condition
	 * @param value - value to validate
	 * @param args - validation arguments
	 */
	public async validate(date: string) {
		return moment().diff(moment(date), 'days') <= 0;
	}

	/**
	 * default message
	 * @param args - validation arguments
	 */
	public defaultMessage(args: ValidationArguments) {
		return `${args.property} must not be a past date`;
	}
}
