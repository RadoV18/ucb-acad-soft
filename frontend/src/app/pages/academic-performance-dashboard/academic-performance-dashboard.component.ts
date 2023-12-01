import {Component, OnInit, ViewChild} from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import {ProfessorService} from "../../services/professor.service";
import {ProfessorSubjectDto} from "../../dto/professor-subject.dto";
import {DashboardServiceService} from "../../services/dashboard-service/dashboard-service.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-academic-performance-dashboard',
  templateUrl: './academic-performance-dashboard.component.html',
  styleUrls: ['./academic-performance-dashboard.component.sass']
})
export class AcademicPerformanceDashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<BarChartOptions>;


  labels: string[] = ["0-40%", "41-60%", "61-90%", "91-100%"];
  data: number[] = [0, 0, 0, 0];
  professors: any[] = [];

  // professors =  [
  //   { value: "FIGUEROA DOMEJEAN OSWALDO JUAN"},
  //   { value: "CAMPOHERMOSO ALCON ERNESTO OMAR"},
  //   { value: "TANCARA AGUILAR JORGE"}
  // ];
  subjects: any[] = [];

  // subjects  = [
  //   { value: "TODAS LAS MATERIAS"},
  //   { value: "BASE DE DATOS I"},
  //   { value: "BASE DE DATOS II"},
  //   { value: "SISTEMAS DE INFORMACIÓN I"},
  //   { value: "TALLER DE GRADO I"},
  //   { value: "TALLER DE GRADO II"}
  // ];
  title: string = "Rendimento Académico - Semestre 2-2023";
  subtitle: string = "Docente: TODOS LOS DOCENTES";

  selectedProfessor: number = 0;
  selectedSubject: number = 0;

  semesterId: number = 4;

  professorSubject: ProfessorSubjectDto[] = [];
  subjectIds: number[] = [];


  constructor(private professorService: ProfessorService, private dashboardService: DashboardServiceService) {
    this.updateChart();
  }

  ngOnInit() {
    this.professorService.getProfessorSubjectsBySemesterId(this.semesterId).subscribe({
      next: (data) => {
        this.professors = [{code: 0, value: "TODOS LOS DOCENTES"}, ...data.data.map((professorSubject) => {
            return {
              code: professorSubject.professor.professorId,
              value: `${professorSubject.professor.firstName} ${professorSubject.professor.lastName}`
            };
          }
        )];
        this.professorSubject = data.data;
        this.subjectIds = this.professorSubject.map((professorSubject) => {
          return professorSubject.subjects.map((subject) => {
            return subject.subjectId;
          });
        }).flat();
        // console.log(this.subjectIds);
        this.getData();
      },
      error: (error) => {
        console.log(error);
      },
    });

  }

  onProfessorChange(event: any) {
    // console.log(event);
    const professorId = event.value;
    const professorIndex = this.professorSubject.findIndex((professorSubject) => {
      return professorSubject.professor.professorId === professorId;
    });
    if (professorIndex !== -1) {
      this.subjects = [{
        code: 0,
        value: "TODAS LAS MATERIAS"
      }, ...this.professorSubject[professorIndex].subjects.map((subject) => {
        return {
          code: subject.subjectId,
          value: subject.description
        };
      })];
      this.subtitle = `Docente: ${this.professorSubject[professorIndex].professor.firstName} ${this.professorSubject[professorIndex].professor.lastName}`;
      this.subjectIds = this.professorSubject[professorIndex].subjects.map((subject) => {
        return subject.subjectId;
      });
    } else {
      this.subjects = [{
        code: 0,
        value: "TODAS LAS MATERIAS"
      }];
      this.subtitle = "Docente: TODOS LOS DOCENTES";
      this.subjectIds = this.professorSubject.map((professorSubject) => {
        return professorSubject.subjects.map((subject) => {
          return subject.subjectId;
        });
      }).flat();
    }
    // console.log(this.subtitle);
    this.getData();
  }

  onSubjectChange(event: any) {
    // console.log(event);
    this.selectedSubject = event.value;
    if (this.selectedSubject === 0) {
        this.subjectIds = this.subjects.map((subject) => {
          return subject.code;
        });
        this.subjectIds.shift();
    } else {
      this.subjectIds = [this.selectedSubject];
    }
    if (this.subjectIds.length === 0) {
      this.subjectIds = this.professorSubject.map((professorSubject) => {
        return professorSubject.subjects.map((subject) => {
          return subject.subjectId;
        });
      }).flat();
    }
    console.log(this.subjectIds);
    this.getData();
    // console.log(this.selectedSubject);
  }

  updateChart() {
    // console.log("updateChart");
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

    this.barChartOptions = {
      series: [
        {
          name: "Total de estudiantes",
          data: this.data
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        foreColor: '#fff',
        toolbar: {
          show: false
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
      yaxis: {
        title: {
          text: "Total de estudiantes"
        }
      },
      xaxis: {
        categories: this.labels,
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
          },
        }
      },
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


  getData() {
    this.dashboardService.getAcademicPerformance(this.subjectIds, this.semesterId).subscribe({
      next: (data) => {
        this.data = [
          data.data.totalStudentsWithScoresFrom0to40,
          data.data.totalStudentsWithScoresFrom41to60,
          data.data.totalStudentsWithScoresFrom61to90,
          data.data.totalStudentsWithScoresFrom91to100
        ];
        this.title = `Rendimento Académico - Total \n ${data.data.totalStudents} estudiantes`;
        this.updateChart();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
