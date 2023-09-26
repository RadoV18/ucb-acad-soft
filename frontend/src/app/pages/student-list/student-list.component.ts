import {Component, OnInit} from '@angular/core';
import {StudentListService} from "../../services/student-list.service";
import {SemesterDto} from "../../dto/semester.dto";
import { SubjectDto } from 'src/app/dto/subject.dto';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.sass']
})
export class StudentListComponent implements OnInit{
  professorId = 1;
  semesters: SemesterDto[] = [];

  selectedSemesterId = 0;
  subjects: SubjectDto[] = [];

  constructor(private studentListService: StudentListService) { }

  ngOnInit(): void {
    this.studentListService.getSemestersByProfessorId(this.professorId).subscribe({
      next: (response) => {
        // console.log(response.data);
        this.semesters = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSemesterChange(event: any) {
    // console.log('event :' + event.value);
    this.selectedSemesterId = event.value;
    this.studentListService.getSubjectsByProfessorIdAndSemesterId(this.professorId, event.value).subscribe({
      next: (data) => {
        this.subjects = data.data!;
        // console.log(this.subjects);
      },
      error: (error) => {
        console.log(error);
      }

    });
  }
}
