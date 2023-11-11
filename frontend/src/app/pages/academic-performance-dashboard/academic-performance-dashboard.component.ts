import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};
@Component({
  selector: 'app-academic-performance-dashboard',
  templateUrl: './academic-performance-dashboard.component.html',
  styleUrls: ['./academic-performance-dashboard.component.sass']
})
export class AcademicPerformanceDashboardComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  labels: string[] = ["0-40%", "41-60%", "61-90%", "91-100%"];
  // TODO INJECT DATA FROM API
  data: number[] = [5, 10, 30, 5];
  professors =  [
    { value: "FIGUEROA DOMEJEAN OSWALDO JUAN"},
    { value: "CAMPOHERMOSO ALCON ERNESTO OMAR"},
    { value: "TANCARA AGUILAR JORGE"}
  ];

  subjects  = [
    { value: "TODAS LAS MATERIAS"},
    { value: "BASE DE DATOS I"},
    { value: "BASE DE DATOS II"},
    { value: "SISTEMAS DE INFORMACIÓN I"},
    { value: "TALLER DE GRADO I"},
    { value: "TALLER DE GRADO II"}
  ];
  title: string = "Rendimento Académico - Semestre 2-2023";
  subtitle: string = "Profesor: FIGUEROA DOMEJEAN OSWALDO JUAN";

  selectedProfessor: string = "";
  selectedSubject: string = "";

  constructor() {
    this.chartOptions = {
      series: this.data,
      chart: {
        width: 700,
        type: "pie",
        foreColor: '#fff',

      },
      labels: this.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      title: {
        text: this.title,
        align: "center",
        margin: 40,
        offsetX: 0,
        offsetY: 10,
        floating: false,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "white"
        }
      },
      subtitle: {
        text: this.subtitle,
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "white"
        }
      }
    };
  }
}
