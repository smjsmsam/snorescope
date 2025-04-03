import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	public sleepStart:Date;
	public sleepEnd:Date;
	public length:number; //in hrs

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
		this.length = (sleepEnd.getTime() - sleepStart.getTime()) / (1000*60*60);
	}

	override summaryString():string {
		// Convert to hours and minutes
		return Math.floor(this.length) + " hours, " + Math.floor(this.length * 60 % 60) + " minutes.";
	}

	override dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
