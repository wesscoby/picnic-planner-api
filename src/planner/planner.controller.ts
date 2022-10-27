import {
	Controller,
	Get,
	Query,
	Version,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiBadRequestResponse,
	ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PlannerService } from './planner.service';
import { OptimalDayEntity } from './entity';
import { PartyPlanDto } from './dto';

@ApiTags('Planner')
@Controller()
export class PlannerController {
	constructor(private readonly planner: PlannerService) {}

	@ApiOperation({
		description: 'Get an optimal date and location for hosting a picnic',
	})
	@ApiOkResponse({
		type: OptimalDayEntity,
		description: 'An optimal day and location',
	})
	@ApiNotFoundResponse({ description: 'No optimal day and location found' })
	@ApiBadRequestResponse({
		description: 'Request not accepted due to validation errors',
	})
	@Version(VERSION_NEUTRAL)
	@Get('party_plan')
	async getPartyPlan(@Query() query: PartyPlanDto) {
		return this.planner.getPartyPlan(query);
	}
}
