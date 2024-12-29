import { Module } from '@nestjs/common';
import { CreateFormService } from './form-services';
import { FormControllers } from './form-controllers';

@Module({
	imports: [],
	controllers: [FormControllers],
	providers: [CreateFormService],
})
export class AppModule {}
