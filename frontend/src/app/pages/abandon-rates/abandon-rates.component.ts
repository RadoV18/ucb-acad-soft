import { Component, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { AbandonRatesDTO } from 'src/app/dto/abandon-rates.dto';
import { AbandonRatesService } from 'src/app/services/abandon-rates.service';

type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

type BarOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-abandon-rates',
  templateUrl: './abandon-rates.component.html',
  styleUrls: ['./abandon-rates.component.sass']
})

export class AbandonRatesComponent {
  @ViewChild("grade") grade!: ChartComponent;
  public gradeOptions: Partial<ChartOptions>;

  @ViewChild("month") month!: ChartComponent;
  public monthOptions: Partial<BarOptions>;

  @ViewChild("comparison") comparison!: ChartComponent;
  public comparisonOptions: Partial<BarOptions>;

  constructor(private abandonRatesService: AbandonRatesService) {
    this.gradeOptions = {
      series: [44, 55, 13, 43, 0],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["30%", "50%", "60%", "80%", "100%"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.monthOptions = {
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams"],
          "Amber",
          ["Peter", "Brown"],
          ["Mary", "Evans"],
          ["David", "Wilson"],
          ["Lily", "Roberts"]
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };

    this.comparisonOptions = {
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'Germany'
        ],
      }
    };

    this.abandonRatesService.GetAbandonRates().subscribe((response: AbandonRatesDTO) => {
      this.gradeOptions = { ...this.gradeOptions, series: response.byGrades.map(x => x.value), labels: response.byGrades.map(x => x.label) };
      this.monthOptions = { ...this.monthOptions, series: [{ name: "Abandonos", data: response.byMonths.map(x => x.value) }], xaxis: { categories: response.byMonths.map(x => x.label)} };
      this.comparisonOptions = { ...this.comparisonOptions, series: [{ name: "Abandonos", data: response.bySubjects.map(x => x.value) }], xaxis: { categories: response.bySubjects.map(x => x.label)} };
    });
  }
}
