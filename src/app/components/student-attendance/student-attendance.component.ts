import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentAttendanceComponent {
  private data: any[] = [];
  private svg: any;
  private margin = { top: 10, right: 0, bottom: 30, left: 30 };
  // private width = 750 - this.margin.left - this.margin.right;
  // private height = 250 - this.margin.top - this.margin.bottom;
  private width!: number;
  private height!: number;
  private resizeListener: any;


  constructor(private http: HttpClient, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.http.get('assets/data/test-data.json').subscribe((data: any) => {
      this.data = data.attendanceData;
      this.createSvg();
      this.drawLine(this.data);
    });
    this.resizeListener = () => this.updateChartOnResize();
    window.addEventListener('resize', this.resizeListener);
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  private createSvg(): void {
    const figure = d3.select(this.elementRef.nativeElement).select("figure#line");
  
    this.width = parseInt(figure.style('width'), 10) - this.margin.left - this.margin.right;
  
    if (this.width < 500) {
      this.height = this.width / 1.2 - this.margin.top - this.margin.bottom;
    } else {
      this.height = this.width / 2 - this.margin.top - this.margin.bottom;
    }
  
    figure.selectAll('*').remove();
  
    this.svg = figure.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  
  private drawLine(data: any[]): void {
    const filteredData = data.map(d => ({
      week: d.week,
      attendance: d.attendance !== null ? d.attendance : 0
    }));
  
    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.week))
      .range([0, this.width])
      .padding(0.2);
  
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);
  
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));
  
    this.svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d => d + '%'));
  
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
  
    const line = d3.line<any>()
      .x((d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .y((d: any) => y(d.attendance));
  
    this.svg.append('path')
      .datum(filteredData)
      .attr('class', 'line-path') 
      .attr('d', line);
  
    this.svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr('cy', (d: any) => y(d.attendance))
      .attr('r', 5)
      .attr('class', 'line-circle'); 
  
    this.svg.append('line')
      .attr('x1', (x(filteredData[filteredData.length - 1].week) || 0) + x.bandwidth() / 2)
      .attr('x2', (x('21/10') || 0) + x.bandwidth() / 2)
      .attr('y1', y(filteredData[filteredData.length - 1].attendance))
      .attr('y2', y(55))
      .attr('class', 'line-dashed'); 
  }
  
  private updateChartOnResize(): void {
    this.createSvg();
    this.drawLine(this.data);
  }
}
