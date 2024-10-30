import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import {DataService} from '../services/data.service';


@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css'],
  encapsulation: ViewEncapsulation.None // Ensures custom styles are not encapsulated
})
export class StudentAttendanceComponent {
  private data: any[] = [];
  private svg: any;
  private margin = { top: 20, right: 5, bottom: 30, left: 70 }; 
  // private width = 750 - this.margin.left - this.margin.right;
  // private height = 250 - this.margin.top - this.margin.bottom;
  private width!: number;
  private height!: number;
  private resizeListener: any;


  constructor(private dataService: DataService,  private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.http.get('assets/data/test-data.json').subscribe((data: any) => {
    //   this.data = data.attendanceData;
    //   this.createSvg();
    //   this.drawLine(this.data);
    // });

    this.dataService.getCourseData().subscribe(
      (data) => {
        this.data = data.attendanceData;
        this.createSvg();
        this.drawLine(this.data);
      },
      (error) => {
        console.error('Error fetching assessment data:', error);
      }
    );
    this.resizeListener = () => this.updateChartOnResize();
    window.addEventListener('resize', this.resizeListener);
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  private setMarginsBasedOnScreenSize(): void {
    const screenWidth = window.innerWidth;
  
    if (screenWidth < 480) {
      // Small screen margins
      this.margin = { top: 5, right: 5, bottom: 20, left: 50 };
    } else if (screenWidth < 768) {
      // Medium screen margins
      this.margin = { top: 10, right: 10, bottom: 25, left: 40 };
    } else {
      // Large screen margins
      this.margin = { top: 15, right: 15, bottom: 30, left: 50 };
    }
  }

  // Function: initializes the chart using D3.js
  private createSvg(): void {
    const figure = d3.select(this.elementRef.nativeElement).select("figure#line");

    this.setMarginsBasedOnScreenSize();
    //Dynamic allocation of chart dimensions
    this.width = parseInt(figure.style('width'), 10) * 1.25 - this.margin.left - this.margin.right;
    this.height = this.width / 2 - this.margin.top - this.margin.bottom;
    //Adjusting the graoh dimensions for smaller screens sizes 
    if (this.width < 500) {
      this.height = this.width / 1.2 - this.margin.top - this.margin.bottom;
    } else {
      this.height = this.width / 2 - this.margin.top - this.margin.bottom;
    }
  
    figure.selectAll('*').remove();
    //Creates svg container
    this.svg = figure.append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.svg.append('text')
    .attr('class', 'axis-label')  // Apply CSS class
    .attr('transform', `translate(${this.width / 2}, ${this.height + this.margin.bottom -5})`)
    .text('Weeks');

  // Add Y-Axis Label
  this.svg.append('text')
    .attr('class', 'axis-label')  // Apply CSS class
    .attr('transform', `translate(${-(this.margin.left / 2)-10}, ${this.height / 2}) rotate(-90)`)
    .text('Attendance');
}
  // Function: Draws lines on the chart depending on the attendance data 
  private drawLine(data: any[]): void {
    //missing attendance data is assigned with 0 for better plotting
    const filteredData = data.map(d => ({
      week: d.week,
      attendance: d.attendance !== null ? d.attendance : 0
    }));
  
    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.week))
      .range([0, this.width])
      .padding(0.1);  
  
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, this.margin.top]);
  
    //Appends to x-axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));
   //Appends to y-axis
    this.svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d => d + '%'));

    
  
    //X-axis grids
    this.svg.append('g')
      .selectAll('line')
      .data(filteredData)
      .enter()
      .append('line')
      .attr('x1', (d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr('x2', (d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr('y1', 0)
      .attr('y2', this.height)
      .attr('class', 'line-grid'); 
  
    //Generateing line based on attendacne data/
    const line = d3.line<any>()
      .x((d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .y((d: any) => y(d.attendance));
    //Appending the lines
    this.svg.append('path')
      .datum(filteredData)
      .attr('class', 'line-path') 
      .attr('d', line);
    //Marking the data points of attendacne values
    this.svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr('cy', (d: any) => y(d.attendance))
      .attr('r', 5)
      .attr('class', 'line-circle'); 
    //Assuming for Future Data 
    this.svg.append('line')
      .attr('x1', (x(filteredData[filteredData.length - 1].week) || 0) + x.bandwidth() / 2)
      .attr('x2', (x('21/10') || 0) + x.bandwidth() / 2)
      .attr('y1', y(filteredData[filteredData.length - 1].attendance))
      .attr('y2', y(55))
      .attr('class', 'line-dashed'); 
  }
  // Function: To update the size of graphs to the screen size(Responsive design)
  private updateChartOnResize(): void {
    this.createSvg();
    this.drawLine(this.data);
  }
}