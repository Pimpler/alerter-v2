import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {IOncallShift} from "../types/IOncallShift";

export type OncallShiftDocument = OncallShift & Document;

@Schema({collection: "oncall-shifts",})
export class OncallShift implements IOncallShift {
	@Prop({required: true})
	date: string;

	@Prop({required: true})
	team: string;

	@Prop({required: true})
	user: string;
}

export const OncallShiftSchema = SchemaFactory.createForClass(OncallShift);
