import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';

@Module({
	imports: [
		HttpModule.registerAsync({ useFactory: () => ({ timeout: 5000 }) }),
	],
	controllers: [PlannerController],
	providers: [PlannerService],
})
export class PlannerModule {}
