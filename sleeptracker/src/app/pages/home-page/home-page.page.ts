import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SleepService } from '../../services/sleep.service';
import { SleepData } from '../../data/sleep-data';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

// TEST, should only import as needed
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { NightInputComponent } from 'src/app/components/night-input/night-input.component';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: true,
  imports: [IonContent, DateInputComponent,  NightInputComponent, IonGrid, IonRow, IonCol],
  providers: [SleepService, DateInputComponent,]
})  

export class HomePage {
  constructor(public sleepService:SleepService) {

	}

	ngOnInit() {
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
}
