import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { SleepService } from 'src/app/services/sleep.service';
import * as vega from 'vega';
import { compile } from 'vega-lite';

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html',
  styleUrls: ['./day-calendar.component.scss'],
  imports: [CommonModule]
})
export class DayCalendarComponent  implements OnInit {
  data:StanfordSleepinessData[];

  constructor(private service:SleepService) {
    this.data = [];
  }

  visualizeDay(day:Date) {
    this.data = SleepService.AllSleepinessData;
    var vis_data:any[];
    vis_data = this.data.filter(dt => dt.loggedAt.getFullYear() === day.getFullYear() &&
                                      dt.loggedAt.getMonth() === day.getMonth() &&
                                      dt.loggedAt.getDate() === day.getDate())
                        .map(function(dt) {
                          return {"x": 0, "summary": dt.summaryString(), "time": dt.loggedAt, "img": dt.image};
                        });
    const containerWidth = window.innerWidth * 0.8; // 80vw
    const containerHeight = window.innerHeight * 0.6; // 60vh                      
    const vis_spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A graph of sleepiness throughout the day",
      "data": {
        "values": vis_data
      },
      "width": containerWidth,
      "height": containerHeight,
      "mark": {
        "type": "image",
        "width": 50,
        "height": 50
      },
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
          "field": "time",
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
        "url": {
          "type": "nominal",
          "field": "img"
        },
        "tooltip": {
          "field": "summary", "type": "nominal", "title": "Summary"
        }
      }
    } as const;
    const vegaSpec = compile(vis_spec).spec;
    const view = new vega.View(vega.parse(vegaSpec))
        .renderer('canvas')  // Choose renderer type (canvas or svg)
        .initialize('#sleepinessVis')  // Specify the container element where the chart will render
        .hover()
        .tooltip((handler, event, item, value) => {
          if(item.datum) {
            document.getElementById("summary")!.innerText = item.datum.summary;
          }
        })
        .run();
  }

  ngOnInit() {
    this.callRetrieve();
  }
  async callRetrieve() {
    await this.service.retrieveDay();
    console.log(SleepService.selectedDate, 'MY SELECTED');
    this.visualizeDay(new Date(SleepService.selectedDate));
  };
}
