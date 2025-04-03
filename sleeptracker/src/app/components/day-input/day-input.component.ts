import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonModal, IonButton } from '@ionic/angular/standalone';
import { SleepService } from 'src/app/services/sleep.service';
import { DayScaleComponent } from 'src/app/components/day-scale/day-scale.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-day-input',
  templateUrl: './day-input.component.html',
  styleUrls: ['./day-input.component.scss'],
  imports: [IonDatetime, IonDatetimeButton, IonModal, IonButton, HttpClientModule, DayScaleComponent],
  providers: [SleepService, AlertController]
})
export class DayInputComponent  implements OnInit {
  dateTime: string;

  constructor(private sleepService: SleepService, public alertController: AlertController) { 
    this.dateTime = new Date().toISOString();
  }

  ngOnInit() {}

  saveEvent(event: any) {
    console.log('DATE SAVED BUTTON CLICKED');
    console.log(this.dateTime)
    this.sleepService.saveDay(this.dateTime);
    this.alertSaved();
  }

  
  async alertSaved() {
    const alert = await this.alertController.create({
      header: 'Save Successful! 🎉',
      //subHeader: 'aoidjfojsadf',
      message: 'Your sleepiness has been saved and is available for view in your data!',
      buttons: ['Yay!']
    });
    
    await alert.present();
  }

  dateTimeChangeEvent(event: any) {
    this.dateTime = event.detail.value;
    console.log("START SELECTED DAY INPUT", this.dateTime);
  }
}
