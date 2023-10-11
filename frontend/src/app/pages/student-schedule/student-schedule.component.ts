import { Component } from '@angular/core';
import { Subject } from 'src/app/interfaces/interfaces';
import { SubjectsService } from 'src/app/services/subjects.service';
import {StudentListService} from "../../services/student-list.service";
import {ResponseDto} from "../../dto/response.dto";

@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.sass']
})
export class StudentScheduleComponent {
  subjects : Subject[] = [
  ]

  displayedColumns: string[] = ['code', 'parallel', 'name', 'instructor'];

  constructor(private subjectsService: SubjectsService, private studentListService: StudentListService) {

  }

  ngOnInit(): void {
    this.subjectsService.fetchSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects

      console.log(this.subjects)
    })
  }

  downloadReport(): void {
    this.studentListService.getStudentSchedulePDF().subscribe((response: ResponseDto<string>) => {
      const data = response.data;
      window.open(data, "_blank")
    });
  }
}
