import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentScheduleComponent } from './pages/student-schedule/student-schedule.component';
import { ProfessorScheduleComponent } from './pages/professor-schedule/professor-schedule.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentKardexComponent } from './pages/student-kardex/student-kardex.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { BriefKardexComponent } from './pages/student-kardex/brief-kardex/brief-kardex.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentScheduleComponent,
    ProfessorScheduleComponent,
    StudentListComponent,
    StudentKardexComponent,
    BriefKardexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
