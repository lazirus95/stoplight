import { Component, OnInit } from '@angular/core';
import { Light } from 'src/app/models/light.model';

@Component({
  selector: 'app-stoplight',
  templateUrl: './stoplight.component.html',
  styleUrls: ['./stoplight.component.scss']
})
export class StoplightComponent implements OnInit {

  data: Light[] = [
    {
      color: "red",
      time: 4000,
      active: false
    },
    {
      color: "yellow",
      time: 1500,
      active: false
    },
    {
      color: "green",
      time: 4000,
      active: false
    }
  ];
  lightsReversed: Light[] = [...this.data].reverse();
  runTime: number = 0;

  constructor() { }

  ngOnInit(): void {

    const intervalTime = this.calculateIntervalTime(this.data);

    //Trigger lightCycle() and loop in an interval to run infinitely after that
    this.lightCycle();
    setInterval(() => {
      this.runTime = 0;
      this.lightCycle();
    }, (intervalTime));

  }

  //Uses timeouts to activate and deactivate lights in sequence from the bottom-up
  lightCycle(): void {
    for (const light of this.lightsReversed) {

      // Set start time
      setTimeout(() => {
        light.active = true;
      }, this.runTime);

      // Calculate end time
      this.runTime += light.time;

      // Set end time
      setTimeout(() => {
        light.active = false;
      }, this.runTime);

    }
  }

  //Sum all light times to determine interval timing
  calculateIntervalTime(data: Light[]): number {
    return data.map(light => light.time).reduce((sum, val) => sum + val, 0);
  }

  //Returns a properly formatted [ngClass] object depending on light color
  getClass(light: Light): {} {
    return {
      'red': light.color == 'red' && light.active, 
      'yellow': light.color == 'yellow' && light.active, 
      'green': light.color == 'green' && light.active
    };
  }

}
