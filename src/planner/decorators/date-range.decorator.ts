import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
	ValidationOptions,
} from 'class-validator';
import moment from 'moment';

export function IsValidDateRange(
	property: string,
	validationOptions?: ValidationOptions,
) {
	return (object: any, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: DateRangeConstraint,
		});
	};
}

@ValidatorConstraint({ name: 'IsValidDateRange' })
class DateRangeConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const [relatedPropertyName] = args.constraints;
		const relatedValue = (args.object as any)[relatedPropertyName];
		return moment(value).diff(moment(relatedValue), 'days') >= 0;
	}
}
