import { Component, Input } from '@angular/core';
import { ClassInfo, ClassItem, Subject } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})
export class ScheduleComponent {
  @Input() subjects: Subject[] = [];
  mondayItems: ClassItem[] = [];
  tuesdayItems: ClassItem[] = [];
  wednesdayItems: ClassItem[] = [];
  thursdayItems: ClassItem[] = [];
  fridayItems: ClassItem[] = [];
  saturdayItems: ClassItem[] = [];

  constructor() {
    
  }

  ngOnInit(): void {   
    this.loadClassItems()
  }

  ngOnChanges(): void {
    this.loadClassItems()
  }

  loadClassItems() {
    for (let subject of this.subjects) {
      for (let classInfo of subject.classes) {
        this.assignClassItem(classInfo, subject.name)
      }
    }
  }

  assignClassItem(classInfo: ClassInfo, subject: string) {

    let classItem: ClassItem = { 
      start: classInfo.start,
      end: classInfo.end,
      subject,
      classroom: classInfo.classroom
    }

    switch(classInfo.day) {
      case 'Monday':
        this.mondayItems.push(classItem)
        break;
      case 'Tuesday':
        this.tuesdayItems.push(classItem)
        break;
      case 'Wednesday':
        this.wednesdayItems.push(classItem)
        break;
      case 'Thursday':
        this.thursdayItems.push(classItem)
        break;
      case 'Friday':
        this.fridayItems.push(classItem)
        break;
      case 'Saturday':
        this.saturdayItems.push(classItem)
        break;
      default:
        break;
    }
    
  }

}
