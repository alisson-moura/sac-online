import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateFormService } from './form-services';
import { FormControllers } from './form-controllers';
import { StatusController } from './infra/status.controller';
import { Database } from './infra/database';
import { MigrationsController } from './infra/migrations.controller';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
		}),
	],
	controllers: [FormControllers, StatusController, MigrationsController],
	providers: [CreateFormService, Database],
})
export class AppModule {}
