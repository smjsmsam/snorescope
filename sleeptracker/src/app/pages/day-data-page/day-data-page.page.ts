import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonButton } from '@ionic/angular/standalone';
import { SleepService } from '../../services/sleep.service';
import { DayInputPagePage } from '../day-input-page/day-input-page.page';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { DayCalendarComponent } from 'src/app/components/day-calendar/day-calendar.component';

@Component({
  selector: 'app-day-data-page',
  templateUrl: './day-data-page.page.html',
  styleUrls: ['./day-data-page.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonGrid, IonContent, IonRow,
            DayCalendarComponent, DateInputComponent],
  providers: [SleepService]
})
export class DayDataPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
