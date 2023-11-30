import { Component } from '@angular/core';
import { EvaluatedProfessorDTO } from 'src/app/dto/evaluated-professor.dto';
import { EvaluatedProfessorService } from 'src/app/services/evaluated-professor.service';

@Component({
  selector: 'app-professors-evaluations',
  templateUrl: './professors-evaluations.component.html',
  styleUrls: ['./professors-evaluations.component.sass']
})
export class ProfessorsEvaluationsComponent {

  list: EvaluatedProfessorDTO[] = [];

  constructor(private evaluatedProfessorService: EvaluatedProfessorService) {
    this.evaluatedProfessorService.GetProfessorsEvaluations().subscribe((response) => {
      this.list = response;
      console.log(this.list);
    });
  }
}
