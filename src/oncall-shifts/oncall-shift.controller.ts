import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {OncallShiftService} from './oncall-shift.service';
import {OncallShift} from "./oncall-user.schema";
import {IOncallShift} from "../types/IOncallShift";

@Controller('oncall-shift')
export class OncallShiftController {
	constructor(private readonly onCallShiftService: OncallShiftService) {
	}

	@Get()
	getShifts(
		@Query('date') date: string
	): Promise<OncallShift[] | OncallShift> {
		if (date)
			return this.onCallShiftService.find(date);
		return this.onCallShiftService.findAll();
	}

	@Post()
	create(
		@Body() createOncallShiftDto: IOncallShift
	): Promise<boolean> {
		return this.onCallShiftService.create(createOncallShiftDto);
	}
}
