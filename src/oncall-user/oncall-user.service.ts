import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {OncallUser, OncallUserDocument} from './oncall-user.schema';
import {IOncallUser} from "../types/IOncallUser";
import * as mongoose from "mongoose";

@Injectable()
export class OnCallUserService {
	constructor(
		@InjectModel(OncallUser.name) private onCallModel: Model<OncallUserDocument>
	) {
	}

	async create(createOncallUserDto: IOncallUser): Promise<OncallUser> {
		const createdUser = new this.onCallModel(createOncallUserDto);
		return createdUser.save();
	}

	async findAll(): Promise<OncallUser[]> {
		return this.onCallModel.find().exec();
	}

	async find(userId: string): Promise<OncallUser> {
		return this.onCallModel.findOne({_id: new mongoose.Types.ObjectId(userId)}).exec();
	}
}
