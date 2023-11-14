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

  title: string = "Estudiantes Habilitados y No Habilitados";


  selectedSubject: string = "";


  selectedCarrerId: number = 0;
  selectedSubjectId: number = 0;
  selectedParallelId: number = 0;

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
  }

  setSelectedSubject(event: any) {
    console.log("setSelectedSubject")
    this.selectedSubject = event.value.name;
    this.subtitle = `Asignatura: ${this.selectedSubject} `;
  }

  getData() {
    console.log("getData")
    console.log(this.selectedCarrerId)
    console.log(this.selectedSubjectId)
    console.log(this.selectedParallelId)

    this.studentIndexService.sendFilter(this.selectedCarrerId, this.selectedSubjectId, this.selectedParallelId).subscribe(
      (data) => {
        console.log("data")
        console.log(data)
        console.log("this.data")
        this.data = data;
         this.buildDashboard();

      }
    );


  }

  onSelectedCarrer(event: any) {
    console.log("onSelectedCarrer")
    console.log(event)
    this.dashboardRepository.setSelectedCarrerId(event.id);
    this.selectedCarrerId = event.id;
  }

  onSelectedSubject(event: any) {
    console.log("onSelectedSubject")
    console.log(this.selectedCarrerId)
    this.dashboardRepository.setSelectedSubjectId(this.selectedCarrerId, event.id);
    this.selectedSubjectId = event.id;
  }

  onSelectedParallel(event: any) {
    console.log("onSelectedParallel")
    console.log(event)
    this.selectedParallelId = event.id;
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
