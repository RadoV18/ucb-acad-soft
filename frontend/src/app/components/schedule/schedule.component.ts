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
        this.sortClassItems(this.mondayItems)
        break;
      case 'Tuesday':
        this.tuesdayItems.push(classItem)
        this.sortClassItems(this.tuesdayItems)
        break;
      case 'Wednesday':
        this.wednesdayItems.push(classItem)
        this.sortClassItems(this.wednesdayItems)
        break;
      case 'Thursday':
        this.thursdayItems.push(classItem)
        this.sortClassItems(this.thursdayItems)
        break;
      case 'Friday':
        this.fridayItems.push(classItem)
        this.sortClassItems(this.fridayItems)
        break;
      case 'Saturday':
        this.saturdayItems.push(classItem)
        this.sortClassItems(this.saturdayItems)
        break;
      default:
        break;
    }
    
  }

  sortClassItems(classItems: ClassItem[]) {
    classItems.sort((a, b) => { 
      if (a.start < b.start) {
        return -1;
      }
      if (a.start > b.start) {
        return 1;
      }
      return 0;
    })
  }

}
