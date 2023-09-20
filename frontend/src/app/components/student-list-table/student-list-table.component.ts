import { Component, Input, OnInit } from '@angular/core';
import { StudentListService } from '../../services/student-list.service';
import { SubjectDetailDto } from '../../dto/subject-detail.dto';

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.sass']
})
export class StudentListTableComponent implements OnInit {
  
  @Input() subjectId: number = 0;
  @Input() semesterId: number = 0;
  
  subjectDetail: SubjectDetailDto | undefined;

  constructor(private studentListService: StudentListService) { }

  ngOnInit(): void {
    // console.log(this.subjectId);
    this.studentListService.getSubjectDetailsBySubjectId(this.subjectId).subscribe({
      next: (response) => {

        // console.log(response.data);
        this.subjectDetail = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
