import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { CourseInfoComponent } from './components/course-info/course-info.component';
import { AssessmentProgressComponent } from './components/assessment-progress/assessment-progress.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { CourseStatsComponent } from './components/course-stats/course-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    CourseInfoComponent,
    AssessmentProgressComponent,
    StudentAttendanceComponent,
    CourseStatsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatProgressBarModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
