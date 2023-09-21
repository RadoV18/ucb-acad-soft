import { Component, Input, OnInit } from '@angular/core';
import { StudentListService } from '../../services/student-list.service';
import { SubjectDetailDto } from '../../dto/subject-detail.dto';
import {StudentInfoDto} from "../../dto/student-info.dto";

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.sass']
})
export class StudentListTableComponent implements OnInit {

  @Input() subjectId: number = 0;
  @Input() semesterId: number = 0;

  subjectDetail: SubjectDetailDto | undefined;
  studentList: StudentInfoDto[] | undefined;
  displayedColumns: string[] = ['index','ci', 'name', 'email', 'phone', 'major', 'isActive'];

  constructor(private studentListService: StudentListService) { }

  ngOnInit(): void {
    // console.log(this.subjectId);
    this.studentListService.getSubjectDetailsBySubjectId(this.subjectId, this.semesterId).subscribe({
      next: (response) => {
        // console.log(response.data);
        this.subjectDetail = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.studentListService.getStudentListBySubjectIdAndSemesterId(this.subjectId, this.semesterId).subscribe({
      next: (response) => {
        console.log(response.data);
        this.studentList = response.data;
        this.studentList.sort((a, b) => {
          if (a.lastName > b.lastName) {
            return 1;
          }
          if (a.lastName < b.lastName) {
            return -1;
          }
          return 0;
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  downloadCSV() {
    this.studentListService.getStudentListCSVBySubjectIdAndSemesterId(this.subjectId, this.semesterId).subscribe({
      next: (response) => {
        console.log(response.data);
        window.open(response.data.downloadLink);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
