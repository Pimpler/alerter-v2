import {NestFactory} from '@nestjs/core';
import {App, ExpressReceiver} from '@slack/bolt';
import {AppModule} from './app.module';
import {initOnCallModule} from "./slack/bolt";
import {OnCallUserService} from "./oncall-user/oncall-user.service";
import {OncallShiftService} from "./oncall-shifts/oncall-shift.service";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const receiver = new ExpressReceiver({
		signingSecret: process.env.SLACK_SIGNING_SECRET,
		endpoints: '/',
	});

	const boltApp = new App({
		token: process.env.SLACK_BOT_TOKEN,
		receiver,
	});

	const onCallUserService: OnCallUserService = app.select(AppModule).get(OnCallUserService);
	const oncallShiftService: OncallShiftService = app.select(AppModule).get(OncallShiftService);
	initOnCallModule(boltApp, {onCallUserService, oncallShiftService});
	app.use('/slack/events', receiver.app);

	await app.listen(3000, () => {
		console.log("Server is listening on port 3000")
	});
}

bootstrap();
