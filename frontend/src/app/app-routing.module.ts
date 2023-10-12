import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorScheduleComponent } from './pages/professor-schedule/professor-schedule.component';
import { StudentScheduleComponent } from './pages/student-schedule/student-schedule.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentKardexComponent } from './pages/student-kardex/student-kardex.component';
import {StudentKardexRequestComponent} from "./pages/student-kardex-request/student-kardex-request.component";
import {StudentAttendanceComponent} from "./pages/student-attendance/student-attendance.component";
import {NewRequestComponent} from "./components/new-request/new-request.component";
import { ContinuousEvaluationComponent } from './pages/continuous-evaluation/continuous-evaluation.component';

const routes: Routes = [
  {
    path: 'professor',
    children: [
      { path: 'schedule', component: ProfessorScheduleComponent },
      { path: 'continuous-evaluation', component: ContinuousEvaluationComponent },
    ],
  },
  {
    path: 'student',
    children: [
      { path: 'schedule', component: StudentScheduleComponent },
      { path: 'list', component: StudentListComponent },
      { path: 'kardex', component: StudentKardexComponent },
      { path: 'request/kardex', component: StudentKardexRequestComponent },
      { path: 'attendance', component: StudentAttendanceComponent },
      { path: 'request/kardex/new', component: NewRequestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
