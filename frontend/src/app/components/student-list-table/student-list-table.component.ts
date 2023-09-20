import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.sass']
})
export class StudentListTableComponent implements OnInit {
  
  @Input() subjectId: number = 0;
  @Input() semesterId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
