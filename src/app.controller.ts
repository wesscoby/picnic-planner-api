import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_OPTIONS } from 'common/constants';

@ApiTags('App')
@Controller()
export class AppController {
	@Get()
	@Version(VERSION_NEUTRAL)
	index() {
		const { info } = SWAGGER_OPTIONS;
		return {
			title: info.title,
			description: info.description,
		};
	}
}
