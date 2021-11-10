import {
  Input,
  OnInit,
  ViewChild,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { 
  ChartType, 
  ChartDataSets, 
  ChartOptions, 
} from 'chart.js';

import { 
  Label, 
  Color, 
  BaseChartDirective 
} from 'ng2-charts';

import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {
  
  @Input() maxValue!: any;
  @Input() minValue!: any;
  @Input() title!: string;
  @Input() data!: Array<number>;
  @Input() labels!: Array<string>;

  lineChartLegend = false;
  lineChartLabels!: Label[];
  lineChartData!: ChartDataSets[];
  lineChartType: ChartType = 'line';
  lineChartOptions: (ChartOptions) = {};
  @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;

  lineChartColors: Color[] = [
    {
      pointRadius: 8,
      pointHoverRadius: 6,
      borderColor: '#707070',
      pointBorderColor: '#BCC2FB',
      pointBackgroundColor: '#BCC2FB',
      pointHoverBorderColor: '#BCC2FB',
      pointHoverBackgroundColor: '#fff',
    }
  ];

  lineChartPlugins = [pluginAnnotations];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.title && changes.data && changes.labels){
      this.lineChartData = [
        { 
          fill: false,
          lineTension: 0, 
          data: this.data, 
          label: this.title
        }
      ];

      this.lineChartLabels = this.labels;

      this.lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'left',
          textDirection: 'rtl'
        },
        scales: {
          xAxes: [{}],
          yAxes: [
            {
              id: 'y-axis-0',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: this.title,
                fontSize: 20,
              },
              ticks: {
                max: this.maxValue + 5,
                min: this.minValue - 5,
                stepSize: 10,
                display:false,
              }
            }
          ]
        },
        annotation: {
          annotations: [
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.maxValue,
              borderColor: '#FF5E5E',
              borderWidth: 2,
              // label: {
              //   enabled: true,
              //   fontColor: 'red',
              //   content: 'Max'
              // }
            },
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.minValue,
              borderColor: '#FF5E5E',
              borderWidth: 2,
              // label: {
              //   enabled: true,
              //   fontColor: 'red',
              //   content: 'LineAnno'
              // }
            },
          ],
        }
      }
    }
  }
}
