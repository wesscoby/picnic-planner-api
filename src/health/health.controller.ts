import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	HealthCheckService,
	HttpHealthIndicator,
	HealthCheck,
	DiskHealthIndicator,
	MemoryHealthIndicator,
} from '@nestjs/terminus';
import Config from 'config';

@ApiTags('App')
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
		private config: Config.Service,
		private disk: DiskHealthIndicator,
		private memory: MemoryHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	check() {
		const { host } = this.config.app;

		return this.health.check([
			() => this.http.pingCheck('http', host),
			() => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
			() => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
			() =>
				this.disk.checkStorage('disk_storage', {
					thresholdPercent: 0.5,
					path: '/',
				}),
		]);
	}
}
