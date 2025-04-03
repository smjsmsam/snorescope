import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonButton } from '@ionic/angular/standalone';
import { SleepChartComponent } from 'src/app/components/sleep-chart/sleep-chart.component';
import { SleepCalendarComponent } from 'src/app/components/sleep-calendar/sleep-calendar.component';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';

@Component({
  selector: 'app-sleep-data-page',
  templateUrl: './sleep-data-page.page.html',
  styleUrls: ['./sleep-data-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonButton, CommonModule, FormsModule,
            SleepChartComponent, SleepCalendarComponent, DateInputComponent]
})
export class SleepDataPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  switchVis(event:any) {
    if(document.getElementById("switchButton")!.innerText == "View Daily Sleep") {
      document.getElementById("calendar")!.style.display = "block";
      document.getElementById("chart")!.style.display = "none";
      document.getElementById("switchButton")!.innerText = "View Weekly Sleep";
      document.getElementById("titleText")!.innerText = "How I Slept on the Day of";
    }
    else {
      document.getElementById("calendar")!.style.display = "none";
      document.getElementById("chart")!.style.display = "block";
      document.getElementById("switchButton")!.innerText = "View Daily Sleep";
      document.getElementById("titleText")!.innerText = "How I Slept on the Week of";
    }
  }

}
