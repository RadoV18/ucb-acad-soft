import {Component, OnInit} from '@angular/core';
import {StudentListService} from "../../services/student-list.service";
import {SubjectDto} from "../../dto/subject.dto";
import {StudentAttendanceService} from "../../services/student-attendance.service";

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.sass']
})
export class StudentAttendanceComponent implements OnInit{
  professorId = 1;
  semesterId = 4;

  subjects: SubjectDto[] = [];

  constructor(private studentListService: StudentListService) { }

  ngOnInit(): void {
    this.studentListService.getSubjectsByProfessorIdAndSemesterId(this.professorId, this.semesterId).subscribe({
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
