import { Component } from '@angular/core';
import {SubjectDto} from "../../dto/subject.dto";
import {StudentListService} from "../../services/student-list.service";
import {FinalEvaluationService} from "../../services/final-evaluation/final-evaluation.service";
import {SecondTermEvaluationService} from "../../services/second-term-evaluation/second-term-evaluation.service";

@Component({
  selector: 'app-second-term-evaluation',
  templateUrl: './second-term-evaluation.component.html',
  styleUrls: ['./second-term-evaluation.component.sass']
})
export class SecondTermEvaluationComponent {
  professorId = 1;
  semesterId = 4;

  subjectListDto : SubjectDto[] = []

  displayedColumns: string[] = ['name', 'detail'];



  constructor(private studentListService: StudentListService, private secondTermEvaluation: SecondTermEvaluationService ) { }


  ngOnInit(): void {
    this.studentListService.getSubjectsByProfessorIdAndSemesterId(this.professorId, this.semesterId).subscribe({
      next: (data) => {
        this.subjectListDto = data.data!;
        console.log(this.subjectListDto);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  downloadReport(): void {
    console.log("downloadReport");
    this.secondTermEvaluation.getSecondTermEvaluation().subscribe((response) => {
      const data = response.data;
      window.open(data, "_blank");
    })
  }

}

