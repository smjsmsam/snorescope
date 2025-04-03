import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';
import * as vega from 'vega';
import {compile} from 'vega-lite';

@Component({
  selector: 'app-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.scss'],
})
export class SleepChartComponent  implements OnInit {
  data:OvernightSleepData[];

  constructor(private service:SleepService) {
    this.data = [];
  }
  
  visualizeWeek(week:Date) {
    this.data = SleepService.AllOvernightData;
    var vis_data:any[];
    vis_data = this.data.filter((dt) => Math.ceil((((dt.sleepStart.getTime() - new Date(dt.sleepStart.getFullYear(), 0, 1).getTime()) / 86400000) + new Date(dt.sleepStart.getFullYear(), 0, 1).getDay() + 1) / 7) 
                                    === Math.ceil((((week.getTime() - new Date(week.getFullYear(), 0, 1).getTime()) / 86400000) + new Date(week.getFullYear(), 0, 1).getDay() + 1) / 7) || 
                                    Math.ceil((((dt.sleepEnd.getTime() - new Date(dt.sleepEnd.getFullYear(), 0, 1).getTime()) / 86400000) + new Date(dt.sleepEnd.getFullYear(), 0, 1).getDay() + 1) / 7)
                                    === Math.ceil((((week.getTime() - new Date(week.getFullYear(), 0, 1).getTime()) / 86400000) + new Date(week.getFullYear(), 0, 1).getDay() + 1) / 7))
                        .map(function(dt) {
                          return {"weekday": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dt.sleepStart.getDay()], "length": dt.length};
                        });
    const containerWidth = window.innerWidth * 0.8; // 80vw
    const containerHeight = window.innerHeight * 0.3; // 60vh
    const vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A graph of total hours of sleep over the week.",
        "data": {
          "values": vis_data
        },
        "width": containerWidth,
        "height": containerHeight,
        "mark": "bar",
        "encoding": {
          "x": {
            "field": "weekday",
            "type": "ordinal",
            "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "scale": {
              "domain": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as string[]
            },
            "axis": {
              "labelAngle": 0
            },
            "title": ""
          },
      
          "y": {
            "field": "length",
            "type": "quantitative",
            "axis": {
              "labelExpr": "datum.value + ' hrs'" 
            },
            "title": ""
          },
          "color": {"value": "#98A6C0"}
        }
      } as const;
      const vegaSpec = compile(vis_spec).spec;
      const view = new vega.View(vega.parse(vegaSpec))
                  .renderer('canvas')  // Choose renderer type (canvas or svg)
                  .initialize('#sleepChartVis')  // Specify the container element where the chart will render
                  .run();
    }

  ngOnInit(){
    this.callRetrieve();
  }
  async callRetrieve() {
    await this.service.retrieveNight();
    console.log(SleepService.selectedDate, 'MY SELECTED');
    this.visualizeWeek(new Date(SleepService.selectedDate));
  };
}
