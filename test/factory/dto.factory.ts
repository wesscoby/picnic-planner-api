import { Factory } from 'fishery';
import { faker as F } from '@faker-js/faker';
import moment from 'moment';
import { PartyPlanDto } from 'planner/dto';
import { ForecastParams } from 'planner/types';

export default class Dto {
	static get partyPlan() {
		return Factory.define<PartyPlanDto>(() => ({
			from: moment().format('YYYY-MM-DD'),
			to: moment()
				.add(F.datatype.number({ min: 1, max: 5 }), 'days')
				.format('YYYY-MM-DD'),
			locations: F.helpers.uniqueArray<string>(
				F.address.city,
				F.datatype.number({ min: 1, max: 5 }),
			),
		}));
	}
	static get forecastParams() {
		return Factory.define<ForecastParams>(() => ({
			from: moment().format('YYYY-MM-DD'),
			to: moment()
				.add(F.datatype.number({ min: 1, max: 5 }), 'days')
				.format('YYYY-MM-DD'),
			latitude: Number(F.address.latitude()),
			longitude: Number(F.address.longitude()),
		}));
	}
}
