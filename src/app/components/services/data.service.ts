import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define interfaces for the expected data structures
export interface Credits {
  lecture: number;
  tutorial: number;
  practical: number;
  project: number;
}

export interface CourseData {
  courseCode: string;
  courseName: string;
  courseType: string;
  coursePeriod: string;
  credits: Credits;
  totalStudents: number;
  courseAverageMark: string;
  courseOutcomes: string[];
  mappedToCourse: string[];
}

export interface AssessmentProgressData {
  name: string;
  pending: number;
  completed: number;
}

export interface AttendanceData {
  week: string;
  attendance: number;
}

export interface TestData {
  courseData: CourseData;
  assessmentProgressData: AssessmentProgressData[];
  attendanceData: AttendanceData[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8080/api/data'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to get course data
  getCourseData(): Observable<CourseData[]> {
    return this.http.get<CourseData[]>(`${this.baseUrl}/api/data`); // Replace with the correct API endpoint
  }
}
