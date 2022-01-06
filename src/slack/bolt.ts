import {App} from "@slack/bolt";
import {OnCallUserService} from "../oncall-user/oncall-user.service";
import {OncallShiftService} from "../oncall-shifts/oncall-shift.service";
import { fixDate } from "./utils";

export interface IBoltRequiredServices {
	onCallUserService: OnCallUserService
	oncallShiftService: OncallShiftService
}

const terms = {
	whoOnCall: ["oncall", "who"]
}

export const initOnCallModuleTest = (app: App) => {
	app.message('hello', async ({message, say}) => {
		// say() sends a message to the channel where the event was triggered
		console.log(message)
		await say({
			blocks: [
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": `Hey there `
					},
					"accessory": {
						"type": "button",
						"text": {
							"type": "plain_text",
							"text": "Click Me"

						},
						"action_id": "button_click"
					}
				}
			],
			text: `Hey there `
		});
	});

	app.action('button_click', async ({body, ack, say}) => {
		// Acknowledge the action
		await ack();
		await say(`<@${body.user.id}> clicked the button`);
	});

}

export const initOnCallModule = (app: App, services: IBoltRequiredServices) => {
	const {onCallUserService, oncallShiftService} = services;

	app.event('app_mention', async ({event, context, client, say}) => {
		try {
			console.log(event)
			if (terms.whoOnCall.every(term => event.text.toLowerCase().includes(term.toLowerCase()))) {
				console.log("Check who is on call now");
				const dateNow = new Date();
				console.log(`${fixDate(dateNow.getDate())}/${fixDate(dateNow.getMonth()+1)}/${dateNow.getFullYear()}`)
				const shift = await oncallShiftService.find(`${fixDate(dateNow.getDate())}/${fixDate(dateNow.getMonth()+1)}/${dateNow.getFullYear()}`);
				if (!shift) {
					await say({
						text: 'There is no oncall for today!'
					});
				} else {
					const user = await onCallUserService.find(shift.user);
					const resText = `The oncall is <@${user.slackName}>!`
					await say({
						text: resText
					});
				}
			}

		} catch (error) {
			console.error(error);
		}
	});

}
