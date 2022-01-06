import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {OnCallUserService} from "./oncall-user/oncall-user.service";
import {OncallUser, OncallUserSchema} from "./oncall-user/oncall-user.schema";
import {OncallUserController} from "./oncall-user/oncall-user.controller";
import {OncallShiftController} from "./oncall-shifts/oncall-shift.controller";
import {OncallShiftService} from "./oncall-shifts/oncall-shift.service";
import {OncallShift, OncallShiftSchema} from "./oncall-shifts/oncall-user.schema";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb+srv://cluster0.bxrsp.mongodb.net', {
			user: 'db-user',
			pass: 'test123',
			dbName: 'alerter',
			w: 'majority',
			retryWrites: true
		}),
		MongooseModule.forFeature([
			{name: OncallUser.name, schema: OncallUserSchema},
			{name: OncallShift.name, schema: OncallShiftSchema}
		],),
	],
	controllers: [AppController, OncallUserController, OncallShiftController],
	providers: [AppService, OnCallUserService, OncallShiftService],
	exports: [OnCallUserService],
})
export class AppModule {
}

