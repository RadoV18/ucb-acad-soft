import { Component, Input } from '@angular/core';
import { ClassItem } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.sass']
})
export class ScheduleDayComponent {
  @Input() title = 'Default Day Name';
  @Input() classItems : ClassItem[] = [];
}
