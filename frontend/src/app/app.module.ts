import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentScheduleComponent } from './pages/student-schedule/student-schedule.component';
import { ProfessorScheduleComponent } from './pages/professor-schedule/professor-schedule.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentKardexComponent } from './pages/student-kardex/student-kardex.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { StudentListTableComponent } from './components/student-list-table/student-list-table.component';
import {MatSortModule} from "@angular/material/sort";
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleDayComponent } from './components/schedule/schedule-day/schedule-day.component';
import { ClassItemComponent } from './components/schedule/class-item/class-item.component';
import {HttpClient } from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { StudentKardexRequestComponent } from './pages/student-kardex-request/student-kardex-request.component';
import { StudentAttendanceComponent } from './pages/student-attendance/student-attendance.component';
import { StudentAttendanceTableComponent } from './components/student-attendance-table/student-attendance-table.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./components/dialog/dialog.component";
import {NewRequestComponent} from "./components/new-request/new-request.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentScheduleComponent,
    ProfessorScheduleComponent,
    StudentListComponent,
    StudentKardexComponent,
    StudentListTableComponent,
    ScheduleComponent,
    ScheduleDayComponent,
    ClassItemComponent,
    StudentKardexRequestComponent,
    StudentAttendanceComponent,
    StudentAttendanceTableComponent,
    DialogComponent,
    StudentKardexRequestComponent,
    NewRequestComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
