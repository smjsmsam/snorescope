import { Component, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { SleepService } from 'src/app/services/sleep.service';


@Component({
  selector: 'app-day-scale',
  templateUrl: './day-scale.component.html',
  styleUrls: ['./day-scale.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol ],
  providers: [SleepService,]
})

export class DayScaleComponent  implements OnInit {
  scaleAmount: number

  constructor(private sleepService: SleepService) {
    this.scaleAmount = 1;
    sleepService.updateScale(this.scaleAmount);
   }

  ngOnInit() {}

  imageEvent(value: number) {
    this.scaleAmount = value;
    this.sleepService.updateScale(this.scaleAmount);
  }

}
