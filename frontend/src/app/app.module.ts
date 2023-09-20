import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentScheduleComponent } from './pages/student-schedule/student-schedule.component';
import { ProfessorScheduleComponent } from './pages/professor-schedule/professor-schedule.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentKardexComponent } from './pages/student-kardex/student-kardex.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { StudentListTableComponent } from './components/student-list-table/student-list-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentScheduleComponent,
    ProfessorScheduleComponent,
    StudentListComponent,
    StudentKardexComponent,
    StudentListTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
