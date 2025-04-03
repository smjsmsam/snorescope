import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError, firstValueFrom } from 'rxjs';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import dayData from 'src/app/data/test_day_data.json';
import nightData from 'src/app/data/test_night_data.json';
import { Observer } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class SleepService {
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
	public static db: any;
	public static selectedDate: string; // for day and night depending on which page on
	public static scale: number;

	constructor(private http: HttpClient) {}

	public loadDayData() {
		try {
			var jsonData = dayData;
			if (Array.isArray(jsonData)) {
			  jsonData.forEach(entry => {
				if ('scale' in entry && 'datetime' in entry) {
					const sleepinessDate = new Date(entry.datetime);
					const sleepinessData = new StanfordSleepinessData(entry.scale, sleepinessDate);
					this.logSleepinessData(sleepinessData);
				}
			  });
			} else {
			  console.error('Invalid JSON format: Expected an array');
			}
		  } catch (error) {
			console.error('Error parsing JSON:', error);
		  }
	}

	public loadNightData() {
		try {
			var jsonData = nightData;
			if (Array.isArray(jsonData)) {
			  jsonData.forEach(entry => {
				if ('start' in entry && 'end' in entry) {
				  const startDate = new Date(entry.start);
				  const endDate = new Date(entry.end);
				  const overnightData = new OvernightSleepData(startDate, endDate);
				  this.logOvernightData(overnightData);
				}
			  });
			} else {
			  console.error('Invalid JSON format: Expected an array');
			}
		  } catch (error) {
			console.error('Error parsing JSON:', error);
		  }
	}


	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
	}

	public printSleepData() {
		SleepService.AllSleepData.forEach((data) => console.log(data.summaryString()));
	}

	public printSleepinessData() {
		SleepService.AllSleepinessData.forEach((data) => console.log(data.summaryString()));
	}

	// public async saveDay(selectedDate: string, scale: number, startTime: string) {
	// 	await Operations.insertDay(SleepService.db, selectedDate, scale, startTime);
	// }
	public updateSelectedDate(selectedDate: string) {
		SleepService.selectedDate = selectedDate;
		console.log(SleepService.selectedDate, "THIS IS THE UPDATED DATA")

	}

	public updateScale(scale: number) {
		SleepService.scale = scale;
		console.log(SleepService.scale, "THIS IS THE UPDATED DATA SCALE")
	}

	public saveDay(dateTime: string) {
		console.log(SleepService.selectedDate, SleepService.scale, dateTime, 'SAVE DAY CALLED')
		const dayData = { date: SleepService.selectedDate, scale: SleepService.scale, datetime: dateTime };
		this.http.post('http://localhost:3000/api/insertDayData', dayData).subscribe(this.observer);
		this.logSleepinessData(new StanfordSleepinessData(SleepService.scale, new Date(dateTime)));
	}

	public saveNight(startTime: string, endTime: string) {
		console.log(SleepService.selectedDate, startTime, endTime, 'SAVE DAY CALLED')
		const nightData = { date: SleepService.selectedDate, startTime: startTime, endTime: endTime };
		this.http.post('http://localhost:3000/api/insertNightData', nightData).subscribe(this.observer);
		this.logOvernightData(new OvernightSleepData(new Date(startTime), new Date(endTime)));
	}


	public async retrieveDay(): Promise<any> {
		const type = new HttpParams().set('type', 'DayInput');
		const response = await firstValueFrom(this.http.get('http://localhost:3000/api/retrieveData', { params: type }));
		this.retrieveObserver.next(response); // Manually calling the observer's next method to handle the response
	}

	public async retrieveNight(): Promise<any> {
		const type = new HttpParams().set('type', 'NightInput');
		console.log("HIIIII RETRIEVE NIGHT");
		const response = await firstValueFrom(this.http.get('http://localhost:3000/api/retrieveData', { params: type }));
		this.retrieveObserver.next(response); // Manually calling the observer's next method to handle the response
	}


	observer: Observer<any> = {
		next: response => console.log('Data saved successfully:', response),
		error: err => console.error('Error saving data:', err),
		complete: () => console.log('Request completed'),
	};

	retrieveObserver: Observer<any> = {
		next: response => {
			var jsonData = response;
			if (Array.isArray(jsonData)) {
			  jsonData.forEach(entry => {
				if ('start_time' in entry && 'end_time' in entry) {
					const day = new Date(entry.date);
					const startTime = new Date(entry.start_time);
					const endTime = new Date(entry.end_time);
					const startDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
					const endDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds());
					const overnightData = new OvernightSleepData(startDate, endDate);
					this.logOvernightData(overnightData);
				}
				if ('scale' in entry && 'datetime' in entry) {
					const day = new Date(entry.date);
					const time = new Date(entry.datetime);
					const sleepinessDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
					const sleepinessData = new StanfordSleepinessData(entry.scale, sleepinessDate);
					this.logSleepinessData(sleepinessData);
				}
			  });
			}
		},
		error: err => console.error('Error saving data:', err),
		complete: () => console.log('Request completed'),
	};
}
