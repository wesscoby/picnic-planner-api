import { createMock, DeepMocked as DM } from '@golevelup/ts-jest';

import Config from 'config';

/**
 * MockService
 *
 * Provides a set of mocks for the various service files.
 */
namespace Service {
	export type Config = DM<Config.Service>;

	export class Mock {
		static get config() {
			return createMock<Config.Service>(Config.getVariables());
		}
	}
}

export default Service;
