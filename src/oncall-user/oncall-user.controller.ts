import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {OnCallUserService} from './oncall-user.service';
import {OncallUser} from "./oncall-user.schema";
import {IOncallUser} from "../types/IOncallUser";

@Controller('oncall-user')
export class OncallUserController {
	constructor(private readonly onCallUserService: OnCallUserService) {
	}

	@Get()
	getAllUsers(
		@Query('userId') userId: string
	): Promise<OncallUser[] | OncallUser> {
		if (userId)
			return this.onCallUserService.find(userId);
		return this.onCallUserService.findAll();
	}

	@Post()
	create(
		@Body() createOncallUser: IOncallUser
	): Promise<OncallUser> {
		return this.onCallUserService.create(createOncallUser);
	}
}
