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
    if (event.value === 0 || event.value === undefined || event.value === null) {
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

  savePlan() {
    this.subjectPlansService.UpdatePlan(this.selectedPlan).subscribe((plan) => {
      this.selectedPlan = plan;
    });
  }

  updateDetail(event : any) {
    this.selectedPlan.subjectPlanClasses[event.target.id - 1].detail = event.target.value;
  }

  updateDescription(event : any) {
    this.selectedPlan.description = event.target.value;
  }

  updateDepartment(event : any) {
    this.selectedPlan.department = event.target.value;
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

  deleteRow(row : number) {
    this.selectedPlan.subjectPlanClasses = [...this.selectedPlan.subjectPlanClasses.filter((r) => r.row !== row)]
    this.recalculateRowsId();
  }

  recalculateRowsId() {
    this.selectedPlan.subjectPlanClasses = this.selectedPlan.subjectPlanClasses.map((r, index) => {
      return {
        ...r,
        row: index + 1,
      };
    });
  }

  onDownloadClick() {
    this.subjectPlansService.getPdfReport(this.selectedPlan.id).subscribe((response) => {
      if (response.successful) {
        window.open(response.data, '_blank');
      }
    });
  }
}
