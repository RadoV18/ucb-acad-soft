import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {KardexService} from "../../services/kardex-sevice/kardex.service";
import {SemesterResume} from "../../models/SemesterResume";

@Component({
  selector: 'app-student-kardex',
  templateUrl: './student-kardex.component.html',
  styleUrls: ['./student-kardex.component.sass']
})
export class StudentKardexComponent implements OnInit {


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
  // dataSource: MatTableDataSource<any> | any;

  kardex: SemesterResume[] = [];


  // Your JSON data should be assigned here
  jsonData = [
    {
      academicPeriod: '1-2020',
      initSemester: '03-02-2020',
      endSemester: '07-12-2020',
      career: 'Ingenieria de Sistemas',
      subjects: [
        {
          site: 'La Paz',
          careerSail: 'CAR',
          subjectSail: 'CAR-109',
          subjectName: 'ESCRITURA ACADEMICA',
          parallel: 16,
          academicCredits: 5,
          economicCredits: 5,
          continuousScore: 90,
          reference: {
            semester: 1,
            year: 2020,
            turn: 1,
          },
          finalTestScore: 90,
          finalScore: 90,
        },
        {
          site: 'La Paz',
          careerSail: 'INS',
          subjectSail: 'SIS-121',
          subjectName: 'INGENIERIA DE SISTEMAS 1',
          parallel: 1,
          academicCredits: 5,
          economicCredits: 5,
          continuousScore: 93,
          reference: {
            semester: 1,
            year: 2020,
            turn: 1,
          },
          finalTestScore: 93,
          finalScore: 93,
        },
      ],
      totalCredits: 10,
      average: 91.5,
    },
    {
      academicPeriod: '2-2020',
      initSemester: '08-03-2020',
      endSemester: '12-31-2020',
      career: 'Ingenieria de Sistemas',
      subjects: [
        {
          site: 'La Paz',
          careerSail: 'REL',
          subjectSail: 'FHC-140',
          subjectName: 'ANTROPOLOGIA CRISTIANA',
          parallel: 3,
          academicCredits: 5,
          economicCredits: 5,
          continuousScore: 88,
          reference: {
            semester: 2,
            year: 2020,
            turn: 1,
          },
          finalTestScore: 70,
          finalScore: 79,
        },
        {
          site: 'La Paz',
          careerSail: 'INS',
          subjectSail: 'SIS-131',
          subjectName: 'ARQUITECTURA DE COMPUTADORAS',
          parallel: 1,
          academicCredits: 6,
          economicCredits: 6,
          continuousScore: 100,
          reference: {
            semester: 2,
            year: 2020,
            turn: 1,
          },
          finalTestScore: 100,
          finalScore: 100,
        },
      ],
      totalCredits: 11,
      average: 89.5,
    },
  ];

  constructor(private kardexService: KardexService) {


  }

  ngOnInit(): void {
    this.kardexService.getMyKardex().subscribe(
      {next: (response) => {
        console.log(response);
        this.kardex = response.data;
        // this.dataSource = new MatTableDataSource<any>(this.kardex);
      }}
    );

  }
}
