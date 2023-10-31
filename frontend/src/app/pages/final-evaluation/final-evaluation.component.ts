import { Component } from '@angular/core';
import {SubjectDto} from "../../dto/subject.dto";
import {StudentListService} from "../../services/student-list.service";
import {FinalEvaluationService} from "../../services/final-evaluation/final-evaluation.service";

@Component({
  selector: 'app-final-evaluation',
  templateUrl: './final-evaluation.component.html',
  styleUrls: ['./final-evaluation.component.sass']
})
export class FinalEvaluationComponent {
  professorId = 1;
  semesterId = 4;

  subjectListDto : SubjectDto[] = []

  displayedColumns: string[] = ['name', 'detail'];



  constructor(private studentListService: StudentListService, private finalEvaluation: FinalEvaluationService ) { }


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
    this.finalEvaluation.getFinalEvaluation().subscribe((response) => {
      const data = response.data;
      window.open(data, "_blank");
    })
  }

}

