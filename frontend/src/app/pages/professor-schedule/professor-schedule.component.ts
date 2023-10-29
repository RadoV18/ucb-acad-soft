import { Component } from '@angular/core';
import { Subject } from 'src/app/interfaces/interfaces';
import { SubjectsService } from 'src/app/services/subjects.service';
import {ProfessorService} from "../../services/professor.service";
import {ResponseDto} from "../../dto/response.dto";

@Component({
  selector: 'app-professor-schedule',
  templateUrl: './professor-schedule.component.html',
  styleUrls: ['./professor-schedule.component.sass']
})
export class ProfessorScheduleComponent {
  displayedColumns: string[] = ['code', 'parallel', 'name'];

  subjects: Subject[] = []

  constructor(private subjectsService: SubjectsService, private professorService: ProfessorService) {

  }

  ngOnInit(): void {
    this.subjectsService.fetchSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects
    })
  }

  downloadReport() {
    this.professorService.getProfessorSchedulePDF().subscribe((response: ResponseDto<string>) => {
      const data = response.data;
      window.open(data, "_blank")
    });
  }
}
