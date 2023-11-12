import {Component, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import {StudentIndexService} from "../../services/dashboards/student-index/student-index.service";
import {CarrerDto} from "../../dto/carrer.dto";


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

  carrers: CarrerDto[]  = [

  ];
  title: string = "Estudiantes Habilitados y No Habilitados";


  selectedSubject: string = "";
  subtitle: string = `Asignatura: ${this.selectedSubject} `;

  ngOnInit() {
    console.log("ngOnInit")
  }




  constructor(private studentIndexService: StudentIndexService) {
    this.studentIndexService.getCarrers().subscribe(
      (response) => {
        this.carrers = response.data;
        console.log(response)
        // console.log(this.subjects)
      });

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

  setSelectedSubject(event: any) {
    console.log("setSelectedSubject")
    this.selectedSubject = event.value.name;
    this.subtitle = `Asignatura: ${this.selectedSubject} `;
    // // @ts-ignore
    // this.chartOptions.subtitle.text = this.subtitle;
    // // @ts-ignore
    // console.log(this.chartOptions.subtitle.text)
  }

  getData() {
    console.log(this.selectedSubject)
  }

}
