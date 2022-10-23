import { Global, Module } from '@nestjs/common';
import { ConfigModule as CM, ConfigService } from '@nestjs/config';
import Config from '.';

@Global()
@Module({
	imports: [
		CM.forRoot({
			load: [Config.getVariables],
			validationSchema: Config.schema,
			validationOptions: {
				abortEarly: true,
			},
		}),
	],
	providers: [ConfigService, Config.Service],
	exports: [Config.Service],
})
export class CustomConfigModule {}
