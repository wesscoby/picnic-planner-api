import { TransformFnParams } from 'class-transformer';

export const locationTransform = ({ value }: TransformFnParams) => {
	if (!Array.isArray(value)) {
		return [value];
	}

	return value;
};
