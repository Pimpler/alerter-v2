import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {IOncallUser} from "../types/IOncallUser";

export type OncallUserDocument = OncallUser & Document;

@Schema({collection: "oncall-users"})
export class OncallUser implements IOncallUser {
	@Prop({required: true})
	name: string;

	@Prop({required: true})
	slackName: string;

	@Prop({required: true})
	email: string;

	@Prop({required: true})
	phone: string;
}

export const OncallUserSchema = SchemaFactory.createForClass(OncallUser);
