import {Component, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import {StudentIndexService} from "../../services/dashboards/student-index/student-index.service";
import {CarrerDto, DashboardDto, ParallelDto, SubjectDto} from "../../dto/carrer.dto";
import {DashboardRepository} from "../../repositories/dashboardRepository";
import {SemesterDto} from "../../dto/semester.dto";


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
  data: any = [
    {
      data: [{
        x: "category A",
        y: 100
      }, {
        x: "category B",
        y: 18
      }]
    }
  ];

  data1: any = [
    {
      data: [{
        x: "category A",
        y: 1
      }, {
        x: "category B",
        y: 18
      }]
    }
  ];


  carrers: CarrerDto[]  = [

  ];

  subjects: SubjectDto[] = [];

  parallels: ParallelDto[] = [];

  semesters: SemesterDto[] = []

  title: string = "Estudiantes Habilitados y No Habilitados";


  selectedSubject: string = "";


  selectedCarrerId: any;
  selectedSubjectId: any;
  selectedParallelId: any;
  selectedSemesterId: any;


  subtitle: string = `Asignatura: ${this.selectedSubject} `;

  ngOnInit() {
    console.log("ngOnInit")
  }




  constructor(private studentIndexService: StudentIndexService, private dashboardRepository: DashboardRepository) {
    this.studentIndexService.getCarrers().subscribe();
    this.dashboardRepository.carrers$.subscribe((carrers) => {
      this.carrers=carrers;
    });
    this.dashboardRepository.subjects$.subscribe((subjects) => {
      this.subjects=subjects;
    });

    this.dashboardRepository.parallels$.subscribe((parallels) => {
      this.parallels = parallels;
    });

    this.selectedCarrerId = this.dashboardRepository.getSelectedCarrerId();
    this.selectedSubjectId = this.dashboardRepository.getSelectedSubjectId();


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

   this.studentIndexService.gerSemeters().subscribe(
      (data) => {
        console.log("data")
        console.log(data)
        console.log("this.data")
        this.semesters = data.data;
      }
    );
  }

  setSelectedSubject(event: any) {
    console.log("setSelectedSubject")
    this.selectedSubject = event.value.name;
    this.subtitle = `Asignatura: ${this.selectedSubject} `;
  }

  getData() {
    console.log("getData")
    console.log("SELECTED CARRER")
    console.log(this.selectedCarrerId.id)
    console.log("SELECTED SUBJECT")
    console.log(this.selectedSubjectId.id)
    console.log("SELECTED PARALLEL")
    console.log(this.selectedParallelId.id)
    console.log("SELECTED SEMESTER")
    console.log(this.selectedSemesterId.semesterId)
    this.studentIndexService.sendFilter(this.selectedCarrerId, this.selectedSubjectId, this.selectedParallelId, this.selectedSemesterId).subscribe(
      (data) => {
        console.log("data")
        console.log(data)
        console.log("this.data")
        this.data = data;
         this.buildDashboard();

      }
    );


  }


// Functions to handle dropdown changes
  onSelectedCarrer(event: any) {
    this.selectedCarrerId = event;
  }

  onSelectedSubject(event: any) {
    this.selectedSubjectId = event;
  }

  onSelectedParallel(event: any) {
    this.selectedParallelId = event;
  }

  onSelectedSemester(event: any) {
    this.selectedSemesterId = event;
  }


  buildDashboard() {
    console.log("buildDashboard")
    console.log(this.data.data)
    this.chartOptions = {
      series: JSON.parse(`[{"data": ${JSON.stringify(this.data.data)}}]`),
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
