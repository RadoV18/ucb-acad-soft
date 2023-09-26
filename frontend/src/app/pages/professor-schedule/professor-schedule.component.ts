import { Component } from '@angular/core';
import { Subject } from 'src/app/interfaces/interfaces';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-professor-schedule',
  templateUrl: './professor-schedule.component.html',
  styleUrls: ['./professor-schedule.component.sass']
})
export class ProfessorScheduleComponent {
  displayedColumns: string[] = ['code', 'parallel', 'name'];

  subjects : Subject[] = [
  ]

  constructor(private subjectsService: SubjectsService) { 

  }

  ngOnInit(): void {
    this.subjectsService.fetchSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects
    })
  }
}
