import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorScheduleComponent } from './pages/professor-schedule/professor-schedule.component';
import { StudentScheduleComponent } from './pages/student-schedule/student-schedule.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentKardexComponent } from './pages/student-kardex/student-kardex.component';

const routes: Routes = [
  { path: 'professor/schedule', component: ProfessorScheduleComponent },
  { path: 'student/schedule', component: StudentScheduleComponent },
  { path: 'student/list', component: StudentListComponent },
  { path: 'student/kardex', component: StudentKardexComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
