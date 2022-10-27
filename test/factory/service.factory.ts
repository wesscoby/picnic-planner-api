import { HttpService } from '@nestjs/axios';
import { createMock, DeepMocked as DM } from '@golevelup/ts-jest';
import { PlannerService } from 'planner/planner.service';

import Config from 'config';

/**
 * MockService
 *
 * Provides a set of mocks for the various service files.
 */
namespace Service {
	export type Config = DM<Config.Service>;
	export type Http = DM<HttpService>;
	export type Planner = DM<PlannerService>;

	export class Mock {
		static get config() {
			return createMock<Config.Service>(Config.getVariables());
		}

		static get http() {
			return createMock<HttpService>();
		}

		static get planner() {
			return createMock<PlannerService>();
		}
	}
}

export default Service;
