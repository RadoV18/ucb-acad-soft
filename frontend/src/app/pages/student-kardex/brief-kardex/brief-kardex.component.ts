import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-brief-kardex',
  templateUrl: './brief-kardex.component.html',
  styleUrls: ['./brief-kardex.component.sass']
})
export class BriefKardexComponent {

  displayedColumns: string[] = [
    "Concepto",
    "Valor"
  ];

  data = [
    { concept: 'Subjects without grade:', value: 6 },
    { concept: 'Passed subjects:', value: 41 },
    { concept: 'Failed subjects:', value: 0 },
    { concept: 'Pending subjects:', value: 0 },
    { concept: 'Subjects not enabled:', value: 0 },
    { concept: 'Subjects with loss of eligibility:', value: 0 },
    { concept: 'Subjects with partial abandonment:', value: 0 },
    { concept: 'Subjects with total abandonment:', value: 0 },
    { concept: 'Subjects not attended:', value: 0 },
    { concept: 'Sessions failed:', value: 0 },
    { concept: 'Sessions not attended:', value: 0 },
    { concept: 'Convalidated subjects:', value: 2 },
    { concept: 'Total subjects:', value: 48 },
    { concept: 'Total semesters:', value: 10 },
    { concept: 'Approved academic credits:', value: 224 },
    { concept: 'Approved economic credits:', Valor: 224 },
    { concept: 'Total sessions:', value: 41 },
    { concept: 'Total failures:', value: 0 },
    { concept: 'General overall:', value: 91.08 },
    { concept: 'Weighted overall:', value: 91.17 }
  ];

}
