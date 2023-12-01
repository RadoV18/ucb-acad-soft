import {Component, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";
import {StudentIndexService} from "../../services/dashboards/student-index/student-index.service";
import {CareerDto, DashboardCareerDto, DashboardDto, ParallelDto, SubjectDto} from "../../dto/carrer.dto";
import {DashboardRepository} from "../../repositories/dashboardRepository";



export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  markers: ApexMarkers
};

@Component({
  selector: 'app-dashboard-student-index',
  templateUrl: './dashboard-student-index.component.html',
  styleUrls: ['./dashboard-student-index.component.sass']
})
export class DashboardStudentIndexComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart2") chart2!: ChartComponent;
  public chartOptions2: Partial<ChartOptions2>;

  labels: string[] = ["Habilitados", "No Habilitados"];

  notas: number[] = [];
  habilitado: number = 80;
  noHabilitado: number = 10;

  data: any = [
    {
      data: [{
        x: "category A",
        y: this.habilitado
      }, {
        x: "category B",
        y: this.noHabilitado
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

  xAxis: number[] = [];



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

    this.chartOptions2 = {
      series: [
        {
          name: "Notas",
          data: this.notas
        }
      ],
      chart: {
        height: 350,
        type: "line",
        foreColor: '#fff',
      },
      stroke: {
        width: 90,
        curve: "smooth"
      },
      xaxis: {
        type: "numeric",
        categories: this.xAxis,

      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: "Engagement"
        },
        labels: {
          style: {
            colors: "#ffffff"
          }
        }
      }
    };
  }

  setSelectedSubject(event: any) {
    this.selectedSubject = event.value.name;
    this.subtitle = `Asignatura: ${this.selectedSubject} `;
  }

  getData() {
    this.habilitado = 0;
    this.noHabilitado = 0;
    this.studentIndexService.sendFilter(this.dashboardRepository.getSelectedCarrerId(), this.dashboardRepository.getSelectedSubjectId(), this.dashboardRepository.getSelectedParallelId(), this.dashboardRepository.getSelectedSemesterId()).subscribe({
      next :
        (data) => {
          console.log(data)
          for(let i = 0; i < data.data.length; i++) {
            this.notas.push(data.data[i].y)
            this.xAxis.push(parseInt(data.data[i].x))

            if(parseInt(data.data[i].x) < 60){
              this.habilitado += data.data[i].y;
            }
            else {
              this.noHabilitado += data.data[i].y;
            }

          }
          this.data = [
            {
              data: [{
                x: "category A",
                y: this.habilitado
              }, {
                x: "category B",
                y: this.noHabilitado
              }]
            }
          ];
          this.buildDashboard();
        }
      }
    );
  }



  onSelectedSemester(event: any) {
    console.log("onSelectedSemester", event)
    this.dashboardRepository.setSelectedSemesterId(event.id);
  }

  onSelectedCarrer(event: any) {
    console.log("onSelectedCarrer", event)
    this.dashboardRepository.setSelectedCarrerId(event.id);
  }

  onSelectedSubject(event: any) {
    console.log("onSelectedSubject", event)
    this.dashboardRepository.setSelectedSubjectId(event.id);
  }

  onSelectedParallel(event: any) {
    console.log("onSelectedParallel", event)
    this.dashboardRepository.setSelectedParallelId(event.id);
  }



  buildDashboard() {
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
    this.chartOptions2 = {
      series: [
        {
          name: "Notas",
          data: this.notas
        }
      ],
      chart: {
        height: 350,
        type: "line",
        foreColor: '#fff',
      },
      stroke: {
        width: 1,
        curve: "smooth"
      },
      xaxis: {
        type: "numeric",
        categories: this.xAxis,
        min: -10,
        max: 100
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [100, 100, 100, 100]
        }
      },
      yaxis: {
        min: -10,
        max: 100,
        title: {
          text: "Engagement"
        }
      }
    };


  }

}
