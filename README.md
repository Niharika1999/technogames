# Technogames Dashboard -- Angular Application
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.
This project that implements a dashboard for visualizing student attendance and performance. The project consists of three major components as highlighted in the design provided via the Figma prototype.

# Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Responsive Design](#responsive-design)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Key Components](#key-components)
- [Mock Data](#mock-data)
- [Further Help](#further-help)

## Overview
This application recreates the dashboard UI from the provided design in Figma. It is responsive, allowing it to adjust across mobile, tablet, and desktop views. The application includes:
 - A chart for visualizing student attendance across several weeks.
 - A bar graph for assessing student performance in various assignments.
 - A section displaying program outcomes.
 
The application uses hardcoded JSON data for the graphs and data display, simulating a real backend response.

## Prerequisites
To run this project locally, you need the following installed:
- Git: Check by running the command ```git --version``` or install `https://github.com/git-guides/install-git` and clone the repository
    ## Frontend:
    - Node.js (v12+):  Check by running the command ```node -v``` or download from `https://nodejs.org`.
    - Angular CLI (v12+): Check by running the commad ```ng version``` or install by following the command ```npm install -g @angular/cli```
    ## Backend:
    - Java (v8+): Check by running the command ```java -version``` or download from `https://www.oracle.com/java/technologies/downloads/#java11?er=221886`
    - Maven 3.6+: Check by running the command ```mvn -version``` or download from `https://maven.apache.org/install.html`

## Features
Responsive Layout: Adapts to mobile, tablet, and desktop screens.
 - Graphical Representation: Line and bar charts for visualizing data (attendance and assessment).
 - Clean and Modular: Code is organized into four distinct components.
 - No Console Errors: Clean output and error-free code.

## Technologies
 - **Angular**: Frontend framework used for building the UI.
 - **HTML & CSS**: For markup and styling the components.
 - **D3.js**: Chart library used for generating graphs).
 - **JSON**: Simulated backend data is hardcoded as JSON.

## Installation
 1. Cloning the repository: `https://github.com/Niharika1999/technogames.git` or use the command ```gh repo clone Niharika1999/technogames```
 2. Changing the command line to the repository: cd technogames
 3. Installing dependencies: ```npm install``` and ```mvn clean install```
 4. Running the Project: 
    - Frontend: ```ng serve``` (Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.)
    -Backend: ```mvn spring-boot:run```

## Responsive Design
The dashboard layout is designed to adjust dynamically based on screen size. The CSS media queries ensure that the components resize appropriately when viewed on different devices.

 - Desktop View: Full-size charts and program outcomes.
 - Tablet View: The layout is adjusted to fit medium-sized screens.
 - Mobile View: Components stack vertically and resize to fit smaller screens.
To manually test responsiveness, use browser developer tools and switch to different screen sizes.
    
## Project Structure
### Frontend
Here's an overview of the folder structure:
 ```technogames-dashboard/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── assessment-progress/  # Assessment progress component
    │   │   │   ├── course-info/          # Course information component
    │   │   │   ├── course-stats/         # Course statistics component
    │   │   │   └── student-attendance/   # Student attendance component
    │   │   ├── app-routing.module.ts     # Routing configuration
    │   │   ├── app.component.css         # Main component styling
    │   │   ├── app.component.html        # Main component HTML
    │   │   ├── app.component.ts          # Main component TypeScript logic
    │   │   ├── app.module.ts             # App module declaration
    │   ├── assets/
    │   │   └── data/
    │   │       └── test-data.json        # Mock JSON data for testing
    │   ├── index.html                    # Entry point for the app
    │   ├── main.ts                       # Main bootstrap file for Angular
    │   ├── styles.css                    # Global styles
    ├── angular.json                      # Angular project configuration
    ├── package.json                      # Dependencies and scripts
    ├── README.md                         # Project README file
```

### Backend
```technogames-backend/
├── src/
│   ├── main/
│   │   ├── java/com/example/technogamesbackend/
│   │   │   ├── models/                     # Java classes representing data models
│   │   │   │   ├── AssessmentProgressData.java  # Model for student assessment progress
│   │   │   │   ├── AttendanceData.java          # Model for tracking student attendance
│   │   │   │   ├── CourseData.java              # Model for storing course information
│   │   │   │   ├── Credits.java                 # Model for handling course credits
│   │   │   │   ├── TestData.java                # Model for mock test data
│   │   │   ├── DataController.java              # REST controller for data operations
│   │   │   ├── DataService.java                 # Service class for business logic
│   │   │   ├── TechnogamesBackendApplication.java  # Main application class
│   │   │   ├── WebConfig.java                   # Configuration class for CORS and other settings
│   │   ├── resources/
│   │   │   ├── static/                          
│   │   │   ├── templates/                       
│   │   │   ├── application.properties           # Spring Boot configuration properties
│   │   │   ├── test-data.json                   # JSON file containing mock test data
│   ├── test/                                   
├── .mvn/                                        # Maven wrapper directory
├── pom.xml                                      # Maven project file
```
## Key Components
1. Assessment Progress (assessment-progress):
    Displays student performance data through bar charts.
2. Course Info (course-info):
    Displays detailed course information like course name, code, and credits.
3. Course Stats (course-stats):
    Displays course outcomes and program-related statistics.
4. Student Attendance (student-attendance):
    Shows student attendance over multiple weeks in a line chart.

## Mock Data
The application fetches data from a backend service where data is dynamically provided through an API. The backend server manages and serves JSON data for visualizing student attendance, assessment progress, course details, and credits.
### API:
```/api/data```: This single API endpoint serves all required data for the application. The frontend makes a request to this endpoint to retrieve the JSON response.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->
