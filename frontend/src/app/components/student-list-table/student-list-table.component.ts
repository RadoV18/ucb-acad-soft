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

  @Input() professorId: number = 0;
  @Input() subjectId: number = 0;
  @Input() semesterId: number = 0;

  subjectDetail: SubjectDetailDto | undefined;
  studentList: StudentInfoDto[] | undefined;
  displayedColumns: string[] = ['index','ci', 'name', 'email', 'phone', 'major', 'isActive'];

  constructor(private studentListService: StudentListService) { }

  ngOnInit(): void {
    // console.log(this.subjectId);
    this.studentListService.getSubjectDetailsBySubjectId(this.subjectId, this.professorId, this.semesterId).subscribe({
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
        // console.log(response.data);
        this.studentList = response.data;
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
        // window.open(response.data.downloadLink);
        fetch(response.data.downloadLink).then(res => res.blob()).then(blob => {
          // Create a new blob object using the response data of the onload object
          const blobData = new Blob([blob], { type: 'text/csv' });
          // Create a link element
          const anchor = document.createElement('a');
          // Create a reference to the object URL
          anchor.href = window.URL.createObjectURL(blobData);
          // Set the filename that will be downloaded
          anchor.download = `LISTA DE ESTUDIANTES DE ${this.subjectDetail?.subjectName} - ${this.subjectDetail?.semesterName}.csv`;
          // Trigger the download by simulating click
          anchor.click();
          // Revoking the object URL to free up memory
          window.URL.revokeObjectURL(anchor.href);
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
