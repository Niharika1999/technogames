import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Importing Services
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit{

  courseData: any = {};

  //constructor(private http: HttpClient) {}
  constructor (private dataservice: DataService){}

  ngOnInit(): void {
    this.fetchCourseData();
  }
//Fectching Data from JSON file
  fetchCourseData(): void {
    this.dataservice.getCourseData().subscribe(
      (data) => {
        this.courseData = data.courseData;
      },
      (error) => {
        console.error('Error fetching course data:', error);
      }
    );
  }
}
