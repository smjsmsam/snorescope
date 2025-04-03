import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { SleepService } from 'src/app/services/sleep.service';
import { DayCalendarComponent } from 'src/app/components/day-calendar/day-calendar.component';
import { SleepCalendarComponent } from 'src/app/components/sleep-calendar/sleep-calendar.component';
import { SleepChartComponent } from 'src/app/components/sleep-chart/sleep-chart.component';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  imports: [IonDatetime, IonDatetimeButton, IonModal],
  providers: [SleepService, DayCalendarComponent, SleepChartComponent, SleepCalendarComponent]
})
export class DateInputComponent  implements OnInit {

  selectedDate: string;
  // @Output() dateChanged: EventEmitter<string> = new EventEmitter();

  constructor(private sleepService: SleepService, private dayCalendar: DayCalendarComponent, private sleepChart: SleepChartComponent, private sleepCalendar: SleepCalendarComponent) { 
    this.selectedDate = new Date().toISOString();
    this.sleepService.updateSelectedDate(this.selectedDate);
  }

  ngOnInit() {}

  dateChangeEvent(event: any) {
    this.selectedDate = event.detail.value;
    console.log("DATE SELECTED");
    this.sleepService.updateSelectedDate(this.selectedDate);
    this.dayCalendar.callRetrieve();
    this.sleepChart.callRetrieve();
    this.sleepCalendar.callRetrieve();
    // this.dateChanged.emit(this.selectedDate);
  }

}
