import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateFormService } from './form-services';
import { FormControllers } from './form-controllers';
import { StatusController } from './status-controller';
import { Database } from './infra/database';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [FormControllers, StatusController],
	providers: [CreateFormService, Database],
})
export class AppModule {}
