package com.example.technogamesbackend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
public class TestData {
    private CourseData courseData;
    private List<AssessmentProgressData> assessmentProgressData;
    private List<AttendanceData> attendanceData;

    // Getters and Setters

    public CourseData getCourseData() {
        return courseData;
    }

    public void setCourseData(CourseData courseData) {
        this.courseData = courseData;
    }

    public List<AssessmentProgressData> getAssessmentProgressData() {
        return assessmentProgressData;
    }

    public void setAssessmentProgressData(List<AssessmentProgressData> assessmentProgressData) {
        this.assessmentProgressData = assessmentProgressData;
    }

    public List<AttendanceData> getAttendanceData() {
        return attendanceData;
    }

    public void setAttendanceData(List<AttendanceData> attendanceData) {
        this.attendanceData = attendanceData;
    }
}
