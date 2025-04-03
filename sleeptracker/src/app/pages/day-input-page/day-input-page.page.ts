import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { DayScaleComponent } from 'src/app/components/day-scale/day-scale.component';
import { SleepCalendarComponent } from 'src/app/components/sleep-calendar/sleep-calendar.component';
import { SleepChartComponent } from 'src/app/components/sleep-chart/sleep-chart.component';
import { NightInputComponent } from 'src/app/components/night-input/night-input.component';
import { DayInputComponent } from 'src/app/components/day-input/day-input.component';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-day-input-page',
  templateUrl: './day-input-page.page.html',
  styleUrls: ['./day-input-page.page.scss'],
  standalone: true,
  imports: [IonContent,
    DateInputComponent, DayScaleComponent, SleepCalendarComponent, SleepChartComponent, NightInputComponent, DayInputComponent, IonGrid,
  IonRow, IonCol],
  providers: [DateInputComponent, DayScaleComponent]
})
export class DayInputPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
