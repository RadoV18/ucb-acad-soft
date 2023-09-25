import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';

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
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleDayComponent } from './components/schedule/schedule-day/schedule-day.component';
import { ClassItemComponent } from './components/schedule/class-item/class-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentScheduleComponent,
    ProfessorScheduleComponent,
    StudentListComponent,
    StudentKardexComponent,
    ScheduleComponent,
    ScheduleDayComponent,
    ClassItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
