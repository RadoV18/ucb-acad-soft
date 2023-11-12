import {Component, OnInit, ViewChild} from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import {ProfessorService} from "../../services/professor.service";
import {ProfessorSubjectDto} from "../../dto/professor-subject.dto";

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
export class AcademicPerformanceDashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  labels: string[] = ["0-40%", "41-60%", "61-90%", "91-100%"];
  // TODO INJECT DATA FROM API
  data: number[] = [5, 10, 30, 5];
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
  subtitle: string = "Profesor: FIGUEROA DOMEJEAN OSWALDO JUAN";

  selectedProfessor: string = "";
  selectedSubject: string = "";

  semesterId: number = 4;

  professorSubject: ProfessorSubjectDto[] = [];


  constructor(private professorService: ProfessorService) {
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

  ngOnInit() {
    this.professorService.getProfessorSubjectsBySemesterId(this.semesterId).subscribe({
      next: (data) => {
        this.professors = data.data.map((professorSubject) => {
            return {
              code: professorSubject.professor.professorId,
              value: `${professorSubject.professor.firstName} ${professorSubject.professor.lastName}`
            };
          }
        );
        // this.subjects = data.data[0].subjects.map((subject) => {
        //     return {
        //       code: subject.subjectId,
        //       value: subject.description
        //     };
        //   }
        // );
        this.professorSubject = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  onProfessorChange(event: any) {
    console.log(event);
    const professorId = event.value;
    const professorIndex = this.professorSubject.findIndex((professorSubject) => {
      return professorSubject.professor.professorId === professorId;
    });
    this.subjects = [ { code: 0, value: "TODAS LAS MATERIAS" }, ...this.professorSubject[professorIndex].subjects.map((subject) => {
      return {
        code: subject.subjectId,
        value: subject.description
      };
    })];
  }
  onSubjectChange(event: any) {
    console.log(event);
    console.log(this.selectedSubject);
  }
}
