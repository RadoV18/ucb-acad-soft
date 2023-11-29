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
import {SemesterDto} from "../../dto/semester.dto";
import {StudentListService} from "../../services/student-list.service";
import {ProfessorInfoDto} from "../../dto/professor-info.dto";

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
  selector: 'app-professor-performance-dashboard',
  templateUrl: './professor-performance-dashboard.component.html',
  styleUrls: ['./professor-performance-dashboard.component.sass']
})
export class ProfessorPerformanceDashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<BarChartOptions>;

  title: string = "Evalución de desempeño de los docentes";

  generalPerformanceSubtitle: string = "";
  semestersDto: SemesterDto[] = [];
  semesters: any[] = [];
  selectedSemesterId = 0;
  allSemesterIds: number[] = [];
  generalPerformanceLabel: string[] = ["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"];
  generalPerformanceData: number[] = [0, 0, 0, 0, 0];

  individualPerformanceSubtitle: string = "";
  professorsDto: ProfessorInfoDto[] = [];
  professors: any[] = [];
  selectedProfessorId = 0;
  individualPerformanceLabel: string[] = [];
  individualPerformanceData: any[] = [];


  constructor(private professorService: ProfessorService, private dashboardService: DashboardServiceService, private studentListService: StudentListService) {
    this.updateChart();
  }

  ngOnInit() {
    // Filter by professorId
    this.studentListService.getSemestersByProfessorId(1).subscribe({
      next: (response) => {
        // console.log(response.data);
        this.semestersDto = response.data;
        this.semesters = this.semestersDto.map((semester) => {
          return {
            code: semester.semesterId,
            value: semester.semesterName
          };
        });
        this.allSemesterIds = [...this.semestersDto.map((semester) => {
          return semester.semesterId;
        })];
        this.individualPerformanceLabel = [...this.semestersDto.map((semester) => {
          return semester.semesterName;
        })].reverse();
      },
      error: (error) => {
        console.log(error);
      }
    });

    // Filter by semesterId
    this.professorService.getProfessors().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.professorsDto = response.data;
        this.professors = [...this.professorsDto.map((professor) => {
          return {
            code: professor.professorId,
            value: `${professor.firstName} ${professor.lastName}`
          };
        })];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSemesterChange(event: any) {
    console.log(event);
    this.selectedSemesterId = event.value;
    this.dashboardService.getProfessorGeneralPerformanceBySemesterId(this.selectedSemesterId).subscribe({
      next: (response) => {
        this.generalPerformanceData = [
          response.data!.totalProfessorsWithScoresFrom0To20,
          response.data!.totalProfessorsWithScoresFrom21To40,
          response.data!.totalProfessorsWithScoresFrom41To60,
          response.data!.totalProfessorsWithScoresFrom61To80,
          response.data!.totalProfessorsWithScoresFrom81To100
        ];
        this.generalPerformanceSubtitle = `Semestre: ${this.semestersDto.find((semester) => {
          return semester.semesterId === this.selectedSemesterId;
        })!.semesterName}`;
        this.updateChart();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onProfessorChange(event: any) {
    this.selectedProfessorId = event.value;
    this.dashboardService.getProfessorIndividualPerformanceBySemesterIdsAndProfessorId(this.allSemesterIds, this.selectedProfessorId).subscribe({
      next: (response) => {
        const result: any[] = [];
        this.semestersDto.forEach((semester) => {
          response.data.performance.forEach((semesterPerformance) => {
            if (semester.semesterId === semesterPerformance.semester.semesterId) {
              semesterPerformance.subjects.forEach((subject: any) => {
                const existingSubject = result.find((item) => item.code === subject.subjectCode);
                if (existingSubject) {
                  existingSubject.data.push(subject.score);
                } else {
                  result.push({
                    code: subject.subjectCode,
                    name: subject.subjectName,
                    data: [subject.score]
                  });
                }
              });
            }
          }
          );
        });
        this.individualPerformanceData = result.reverse();
        this.individualPerformanceSubtitle = `Docente: ${response.data.professor.firstName} ${response.data.professor.lastName}`;

        this.updateChart();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  updateChart() {
    // console.log("updateChart");
    this.chartOptions = {
      series: this.generalPerformanceData,
      chart: {
        width: 700,
        type: "pie",
        foreColor: '#fff',

      },
      labels: this.generalPerformanceLabel,
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
        text: this.generalPerformanceSubtitle,
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
      series: this.individualPerformanceData,
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
        categories: this.individualPerformanceLabel,
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
        text: this.individualPerformanceSubtitle,
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
