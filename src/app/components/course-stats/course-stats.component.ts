import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-course-stats',
  templateUrl: './course-stats.component.html',
  styleUrls: ['./course-stats.component.css']
})
export class CourseStatsComponent implements OnInit {
  courseData: any = {};

  //constructor(private http: HttpClient) {}
  constructor (private dataservice: DataService){}

  //Fetching Data from JSON file
  ngOnInit(): void {
    // this.http.get('assets/data/test-data.json').subscribe((data: any) => {
    //   this.courseData = data.courseData;
    // });
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
