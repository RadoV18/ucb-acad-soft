import { Component, Input } from '@angular/core';

import { ClassItem } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.sass']
})
export class ClassItemComponent {
  @Input () classItem: ClassItem = {
    start: '9:00',
    end: '10:30',
    subject: 'Default Subject',
    classroom: 'D18'
  }
}
