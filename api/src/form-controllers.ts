import { Body, Controller, Post } from '@nestjs/common';
import { CreateFormService } from './form-services';

@Controller('forms')
export class FormControllers {
	constructor(private createFormService: CreateFormService) {}

	@Post()
	createForm(@Body() createFormDto: any) {
		return this.createFormService.execute(createFormDto);
	}
}
