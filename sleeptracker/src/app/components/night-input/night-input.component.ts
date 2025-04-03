import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonModal, IonButton } from '@ionic/angular/standalone';
import { SleepService } from 'src/app/services/sleep.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-night-input',
  templateUrl: './night-input.component.html',
  styleUrls: ['./night-input.component.scss'],
  standalone: true,
  imports: [IonDatetime, IonDatetimeButton, IonModal, IonButton],
  providers: [SleepService, AlertController]
})
export class NightInputComponent implements OnInit {

  startTime: string;
  endTime: string;

  constructor(private sleepService: SleepService, public alertController: AlertController  ) { 
    this.startTime = new Date().toISOString();
    this.endTime = new Date().toISOString();
  }

  ngOnInit() {}

  startTimeChangeEvent(event: any) {
    this.startTime = event.detail.value;
    console.log("START SELECTED", this.startTime);
  }

  endTimeChangeEvent(event: any) {
    this.endTime = event.detail.value;
    console.log("END SELECTED", this.endTime);
  }

  async warningAlert() {
    const alert = await this.alertController.create({
      header: 'Warning! 🚨',
      //subHeader: 'aoidjfojsadf',
      message: 'Please make sure start time is before end time!',
      buttons: ['Got it!']
    });
    
    await alert.present();
  }

  
  async alertSaved() {
    const alert = await this.alertController.create({
      header: 'Save Successful! 🎉',
      //subHeader: 'aoidjfojsadf',
      message: 'Your sleep has been saved and is available for view in your data!',
      buttons: ['Yay!']
    });
    
    await alert.present();
  }

  saveEvent(event: any) {
    if(new Date(this.startTime) > new Date(this.endTime)) {
      console.log("Invalid input!");
      this.warningAlert();
    }
    else {
      console.log('DATE SAVED BUTTON CLICKED');
      console.log(this.startTime, this.endTime)
      this.sleepService.saveNight(this.startTime, this.endTime);
      this.alertSaved();
    }
  }
}
