import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-stats',
  templateUrl: './course-stats.component.html',
  styleUrls: ['./course-stats.component.css']
})
export class CourseStatsComponent implements OnInit {
  courseData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/data/test-data.json').subscribe((data: any) => {
      this.courseData = data.courseData;
    });
  }

}
