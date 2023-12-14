import { Component } from '@angular/core';
import { SubjectPlan, SubjectPlanClass } from 'src/app/interfaces/interfaces';
import { SubjectPlansService } from 'src/app/services/subject-plans.service';

@Component({
  selector: 'app-subject-plans',
  templateUrl: './subject-plans.component.html',
  styleUrls: ['./subject-plans.component.sass']
})
export class SubjectPlansComponent {
  plans : SubjectPlan[] = [ ];
  selected : number = 0;
  selectedPlan : SubjectPlan = {
    id: 0,
    name: '',
    code: '',
    description: '',
    department: '',
    subjectPlanClasses: [],
  };
  displayedColumns: string[] = ['row', 'detail', 'actions'];

  constructor(private subjectPlansService: SubjectPlansService) {
    this.subjectPlansService.GetAllPlans().subscribe((plans) => {
      this.plans = plans;
    });
  }

  onPlanSelectedChange(event: any) {
    if (event.value === 0) {
      this.selectedPlan = {
        id: 0,
        name: '',
        code: '',
        description: '',
        department: '',
        subjectPlanClasses: [],
      };

      return;
    }

    this.selectedPlan = this.plans[event.value - 1];
  }

  addData(number: number) {
    console.log(this.selectedPlan);
  }

  updateDetail(event : any) {
    this.selectedPlan.subjectPlanClasses[event.target.id - 1].detail = event.target.value;
  }

  checkIfRowIsEmpty(row : SubjectPlanClass) {
    return row.detail === '';
  }

  addRow() {
    const lastRow = this.selectedPlan.subjectPlanClasses[this.selectedPlan.subjectPlanClasses.length - 1];

    if (this.checkIfRowIsEmpty(lastRow)) {
      return;
    }

    this.selectedPlan.subjectPlanClasses = [...this.selectedPlan.subjectPlanClasses, {
      planId: this.selectedPlan.id,
      row: this.selectedPlan.subjectPlanClasses.length + 1,
      detail: '',
    }];
  }
}
