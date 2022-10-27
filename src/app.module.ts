import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CustomConfigModule } from 'config/config.module';
import { HealthModule } from 'health/health.module';
import { AppController } from './app.controller';
import { PlannerModule } from './planner/planner.module';

@Module({
	imports: [
		CustomConfigModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
			serveStaticOptions: {
				index: false,
			},
		}),
		HttpModule.registerAsync({ useFactory: () => ({ timeout: 5000 }) }),
		HealthModule,
		PlannerModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
