import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorScheduleComponent } from './pages/professor-schedule/professor-schedule.component';
import { StudentScheduleComponent } from './pages/student-schedule/student-schedule.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentKardexComponent } from './pages/student-kardex/student-kardex.component';

const routes: Routes = [
  {
    path: 'professor',
    children: [
      { path: 'schedule', component: ProfessorScheduleComponent },
    ],
  },
  {
    path: 'student',
    children: [
      { path: 'schedule', component: StudentScheduleComponent },
      { path: 'list', component: StudentListComponent },
      { path: 'kardex', component: StudentKardexComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
