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
  displayedColumnsBrief: string[] = [
    "Concepto",
    "Valor"
  ];
  // dataSource: MatTableDataSource<any> | any;

   kardex: SemesterResume | any;

  constructor(private kardexService: KardexService) {
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
