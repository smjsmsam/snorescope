import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';
import * as vega from 'vega';
import { compile } from 'vega-lite';

@Component({
  selector: 'app-sleep-calendar',
  templateUrl: './sleep-calendar.component.html',
  styleUrls: ['./sleep-calendar.component.scss'],
})
export class SleepCalendarComponent  implements OnInit {
  data:OvernightSleepData[];
  
  constructor(private service:SleepService) {
    this.data = [];
  }

  visualizeDay(day:Date) {
    this.data = SleepService.AllOvernightData;
    var vis_data:any[];
    vis_data = this.data.filter((dt) => dt.sleepStart.getDate() == day.getDate() ||
                                        dt.sleepEnd.getDate() == day.getDate())
                        .map(function(dt) {
                          return {"x": 0, "start": dt.sleepStart, "end": dt.sleepEnd}
                        })
    console.log("UNFILTERED DATA:");
    console.log(this.data);
    console.log("FILTERED DATA:");
    console.log(vis_data);
    const containerWidth = window.innerWidth * 0.8; // 80vw
    const containerHeight = window.innerHeight * 0.6; // 60vh   
    const vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A graph of sleep throughout the day.",
        "data": {
          "values": vis_data
        },
        "width": containerWidth,
        "height": containerHeight,
        "mark": "bar",
        "encoding": {
          "x": {
            "type": "ordinal",
            "field": "x",
            "axis": {
              "labels": false,
              "title": "",
            }
          },
          "y": {
            "type": "temporal",
            "sort": "descending",
            "field": "start",
            "axis": {
              "format": "%-I %p",
              "tickCount": 24
            },
            "scale": {
              "domain": [
                new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0).toISOString(),
                new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59).toISOString()
              ] as [string, string]
            },
            "title": ""
          },
          "y2": {
            "field": "end"
          },
          "color": {"value": "#98A6C0"}
        }
      } as const;
      const vegaSpec = compile(vis_spec).spec;
      const view = new vega.View(vega.parse(vegaSpec))
                  .renderer('canvas')  // Choose renderer type (canvas or svg)
                  .initialize('#nightCalendarVis')  // Specify the container element where the chart will render
                  .run();
  }

  ngOnInit() {
    this.callRetrieve();
  }
  async callRetrieve() {
    await this.service.retrieveNight();
    console.log(SleepService.selectedDate, 'MY SELECTED');
    this.visualizeDay(new Date(SleepService.selectedDate));
  };

}
