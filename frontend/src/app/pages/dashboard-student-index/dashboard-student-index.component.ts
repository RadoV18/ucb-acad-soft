import {Component, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

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
  selector: 'app-dashboard-student-index',
  templateUrl: './dashboard-student-index.component.html',
  styleUrls: ['./dashboard-student-index.component.sass']
})
export class DashboardStudentIndexComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  labels: string[] = ["Habilitados", "No Habilitados"];
  data: any[] = [{
    data: [{
      x: 'category A',
      y: 100
    }, {
      x: 'category B',
      y: 18
    }]
  }];

  subjects  = [
    { value: "TODAS LAS MATERIAS"},
    { value: "TALLER DE SOFTWARE"},
    { value: "BASE DE DATOS I"},
    { value: "BASE DE DATOS II"},
    { value: "SISTEMAS DE INFORMACIÓN I"},
    { value: "TALLER DE GRADO I"},
    { value: "TALLER DE GRADO II"}
  ];
  title: string = "Estudiantes Habilitados y No Habilitados";
  subtitle: string = "Asignatura: TALLER DE SOFTWARE ";


  selectedSubject: string = "";

  constructor() {
    this.chartOptions = {
      series: this.data,
      chart: {
        width: 700,
        type: "bar",
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
