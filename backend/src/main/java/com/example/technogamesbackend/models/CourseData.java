package com.example.technogamesbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseData {
    private String courseCode;
    private String courseName;
    private String courseType;
    private String coursePeriod;
    private Credits credits; // Nested class for credits
    private List<String> courseOutcomes;
    private List<String> mappedToCourse;
    private int totalStudents;
    private String courseAverageMark;

    // Getters and Setters

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public String getCoursePeriod() {
        return coursePeriod;
    }

    public void setCoursePeriod(String coursePeriod) {
        this.coursePeriod = coursePeriod;
    }

    public Credits getCredits() {
        return credits;
    }

    public void setCredits(Credits credits) {
        this.credits = credits;
    }

    public List<String> getCourseOutcomes() {
        return courseOutcomes;
    }

    public void setCourseOutcomes(List<String> courseOutcomes) {
        this.courseOutcomes = courseOutcomes;
    }

    public List<String> getMappedToCourse() {
        return mappedToCourse;
    }

    public void setMappedToCourse(List<String> mappedToCourse) {
        this.mappedToCourse = mappedToCourse;
    }

    public int getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(int totalStudents) {
        this.totalStudents = totalStudents;
    }

    public String getCourseAverageMark() {
        return courseAverageMark;
    }

    public void setCourseAverageMark(String courseAverageMark) {
        this.courseAverageMark = courseAverageMark;
    }
}
