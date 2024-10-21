import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit{

  courseData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourseData();
  }
//Fectching Data from JSON file
  fetchCourseData(): void {
    this.http.get<any>('assets/data/test-data.json').subscribe(
      data => {
        this.courseData = data.courseData;
      },
      error => {
        console.error('Error fetching course data:', error);
      }
    );
  }
}
