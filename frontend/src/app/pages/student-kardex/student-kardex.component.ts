import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {KardexService} from "../../services/kardex-sevice/kardex.service";
import {SemesterResume} from "../../models/SemesterResume";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-student-kardex',
  templateUrl: './student-kardex.component.html',
  styleUrls: ['./student-kardex.component.sass']
})
export class StudentKardexComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  displayedColumns: string[] = [
    'site',
    'careerSail',
    'subjectSail',
    'subjectName',
    'parallel',
    'academicCredits',
    'economicCredits',
    'continuousScore',
    'reference',
    'finalTestScore',
    'finalScore',
  ];
  displayedColumnsBrief: string[] = [
    "Concepto",
    "Valor"
  ];
  // dataSource: MatTableDataSource<any> | any;

   kardex: SemesterResume | any;

  constructor(private kardexService: KardexService) {

    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Kardex del Estudiante",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#ffffff"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ],
        labels: {
          style: {
            colors: "#ffffff"
          }
        }
      }
    };
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.kardexService.getMyKardex().subscribe(
      {next: (response) => {
        console.log(response);
        this.kardex = response;
        console.log("Kardex");
        console.log(this.kardex);
      }}
    );
  }

  downloadReport(): void {
    this.kardexService.getStudentKardexPDF().subscribe((response) => {
      const data = response.data;
      window.open(data, "_blank");
    })
  }
}
