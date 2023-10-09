import {Component, Input, OnInit} from '@angular/core';
import {AttendanceDto} from "../../dto/attendance.dto";
import {StudentAttendanceService} from "../../services/student-attendance.service";

@Component({
  selector: 'app-student-attendance-table',
  templateUrl: './student-attendance-table.component.html',
  styleUrls: ['./student-attendance-table.component.sass']
})
export class StudentAttendanceTableComponent implements OnInit {
  @Input() professorId: number = 0;
  @Input() subjectId: number = 0;
  @Input() semesterId: number = 0;

  attendanceList: AttendanceDto[] | undefined;
  displayedColumns: string[] = ['index', 'name'];
  dates: Date[] = [];
  dataDisplay: any = [];


  constructor(private studentAttendanceService: StudentAttendanceService) {
  }

  ngOnInit(): void {
    this.studentAttendanceService.getAttendanceListBySubjectIdAndSemesterId(this.subjectId, this.semesterId).subscribe({
      next: (response) => {
        // console.log(response.data);
        this.attendanceList = response.data;
        this.processAttendanceList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  processAttendanceList() {
    this.attendanceList?.forEach((attendance, index) => {
      this.dates.push(attendance.date);
      // push as string
      this.displayedColumns.push(attendance.date.toString());
    });

    // Get all students as a flat array
    let students: String[] = [];
    this.attendanceList?.forEach((attendance, index) => {
      attendance.students.forEach((student) => {
        students.push(student.lastname + ' ' + student.firstname);
      });
    });
    // Remove duplicates
    students = students.filter((value, index) => students.indexOf(value) === index);
    // Sort alphabetically
    students.sort();
    // Create a new dataDisplay with the columns: name, date1, date2, date3, ...
    this.dataDisplay = students.map((student, index) => {
      let data: any = {};
      data.index = index + 1;
      data.name = student;
      this.dates.forEach((date, index) => {
        data[date.toString()] = !!(this.attendanceList?.find((attendance) => {
          return attendance.date === date;
        })?.students.find((studentAttendance) => {
          return studentAttendance.lastname + ' ' + studentAttendance.firstname === student;
        })?.attendance);
      });
      return data;
    });
    console.log(this.dataDisplay);
  }

  downloadCSV() {

  }
}
