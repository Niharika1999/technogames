# Technogames Dashboard -- Angular Application
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.
This project that implements a dashboard for visualizing student attendance and performance. The project consists of three major components as highlighted in the design provided via the Figma prototype.

# Overview
This application recreates the dashboard UI from the provided design in Figma. It is responsive, allowing it to adjust across mobile, tablet, and desktop views. The application includes:
 - A chart for visualizing student attendance across several weeks.
 - A bar graph for assessing student performance in various assignments.
 - A section displaying program outcomes.
 
The application uses hardcoded JSON data for the graphs and data display, simulating a real backend response.

# Prerequisites
To run this project locally, you need the following installed:
 - Node.js (v12+)
 - Angular CLI (v12+)
 - Git

# Features
Responsive Layout: Adapts to mobile, tablet, and desktop screens.
 - Graphical Representation: Line and bar charts for visualizing data (attendance and assessment).
 - Clean and Modular: Code is organized into four distinct components.
 - No Console Errors: Clean output and error-free code.

# Technologies
 - Angular: Frontend framework used for building the UI.
 - HTML & CSS: For markup and styling the components.
 - D3.js: Chart library used for generating graphs).
 - JSON: Simulated backend data is hardcoded as JSON.

# Installation
 1. Cloning the repository: https://github.com/Niharika1999/technogames.git
 2. Changing the command line to the repository: cd technogames
 3. Installing dependencies: npm install
 4. Running the Project: ng serve (Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.)

 # Responsive Design
The dashboard layout is designed to adjust dynamically based on screen size. The CSS media queries ensure that the components resize appropriately when viewed on different devices.

 - Desktop View: Full-size charts and program outcomes.
 - Tablet View: The layout is adjusted to fit medium-sized screens.
 - Mobile View: Components stack vertically and resize to fit smaller screens.
To manually test responsiveness, use browser developer tools and switch to different screen sizes.
    
# Project Structure
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
Data used for testing is located in the assets/data/test-data.json file.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->
