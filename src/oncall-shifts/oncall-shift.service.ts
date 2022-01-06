import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {OncallShift, OncallShiftDocument} from './oncall-user.schema';
import {IOncallShift} from "../types/IOncallShift";

@Injectable()
export class OncallShiftService {
	constructor(
		@InjectModel(OncallShift.name) private onCallShiftModel: Model<OncallShiftDocument>
	) {
	}

	async create(createOncallShiftDto: IOncallShift): Promise<boolean> {
		try {
			const res = await this.onCallShiftModel.updateOne(
				{date: createOncallShiftDto.date},
				{...createOncallShiftDto},
				{upsert: true}
			)
			console.log(res)
			return true;
		} catch (e) {
			console.log(e)
			return false;
		}
	}

	async findAll(): Promise<OncallShift[]> {
		return this.onCallShiftModel.find().exec();
	}

	async find(date: string): Promise<OncallShift> {
		return this.onCallShiftModel.findOne({date}).exec();
	}
}
