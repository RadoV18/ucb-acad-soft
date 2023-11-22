import {Component, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import {StudentIndexService} from "../../services/dashboards/student-index/student-index.service";
import {CareerDto, DashboardCareerDto, DashboardDto, ParallelDto, SubjectDto} from "../../dto/carrer.dto";
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


  semesters: DashboardCareerDto[]  = [

  ];

  careers: CareerDto[] = [];

  subjects: SubjectDto[] = [];

  parallels: ParallelDto[] = [];


  title: string = "Estudiantes Habilitados y No Habilitados";


  selectedSubject: string = "";


  selectedCarrerId: any;
  selectedSubjectId: any;
  selectedParallelId: any;
  selectedSemesterId: any;


  subtitle: string = `Asignatura: ${this.selectedSubject} `;

  ngOnInit() {
  }




  constructor(private studentIndexService: StudentIndexService, private dashboardRepository: DashboardRepository) {
    this.studentIndexService.getCarrers().subscribe();
    this.dashboardRepository.semesters$.subscribe( (semesters) => {
        this.semesters = semesters
      }
    )
    this.dashboardRepository.carrers$.subscribe((carrers) => {
      this.careers=carrers;
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

  }

  setSelectedSubject(event: any) {
    this.selectedSubject = event.value.name;
    this.subtitle = `Asignatura: ${this.selectedSubject} `;
  }

  getData() {
    this.studentIndexService.sendFilter(this.dashboardRepository.getSelectedCarrerId(), this.dashboardRepository.getSelectedSubjectId(), this.dashboardRepository.getSelectedParallelId(), this.dashboardRepository.getSelectedSemesterId()).subscribe(
      (data) => {
        this.data = data;
         this.buildDashboard();

      }
    );


  }


// Functions to handle dropdown changes

  onSelectedSemester(event: any) {
    this.dashboardRepository.setSelectedSemesterId(event.id);
  }

  onSelectedCarrer(event: any) {
    this.dashboardRepository.setSelectedCarrerId(event.id);
  }

  onSelectedSubject(event: any) {
    this.dashboardRepository.setSelectedSubjectId(event.id);
  }

  onSelectedParallel(event: any) {
    this.dashboardRepository.setSelectedParallelId(event.id);
  }



  buildDashboard() {
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
