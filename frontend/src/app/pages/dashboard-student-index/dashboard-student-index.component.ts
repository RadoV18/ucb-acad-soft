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
  ApexTooltip
} from "ng-apexcharts";
import {StudentIndexService} from "../../services/dashboards/student-index/student-index.service";
import {CareerDto, DashboardCareerDto, DashboardDto, ParallelDto, SubjectDto} from "../../dto/carrer.dto";
import {DashboardRepository} from "../../repositories/dashboardRepository";
import {SemesterDto} from "../../dto/semester.dto";
import {style} from "@angular/animations";
import {colors} from "@angular/cli/src/utilities/color";


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

  xAxis: String[] = [];



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
      series:
        [
          {

            name: "Habilitados",
            data: []
          },
          {
            name: "No Habilitados",
            data: [13, 23, 20, 8, 13, 27, 33, 12, 19]
          }
        ],

      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [

        ],
        labels: {
          style: {
            colors: "#ffffff"
          }
        }
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        },
        labels: {
          style: {
            colors: "#ffffff"
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
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
          for(let i = 0; i < data.data.length; i++) {
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
