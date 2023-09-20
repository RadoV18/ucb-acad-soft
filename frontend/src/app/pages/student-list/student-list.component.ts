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
<<<<<<< HEAD

=======
>>>>>>> fd027f7 (TDS-15 added card for searching subjects by professor and semester)
  ngOnInit(): void {
    this.studentListService.getSemestersByProfessorId(this.professorId).subscribe({
      next: (response) => {
        // console.log(response.data);
        this.semesters = response.data;
<<<<<<< HEAD
        // sort semesters by descending order
        this.semesters.sort((a, b) => {
          if (a.semesterName > b.semesterName) {
            return -1;
          }
          if (a.semesterName < b.semesterName) {
            return 1;
          }
          return 0;
        });
=======
>>>>>>> fd027f7 (TDS-15 added card for searching subjects by professor and semester)
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
