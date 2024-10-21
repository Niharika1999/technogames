import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent {
  private data: any[] = [];
  private svg: any;
  private margin = { top: 10, right: 10, bottom: 30, left: 50 };
  private width = 750 - this.margin.left - this.margin.right;
  private height = 250 - this.margin.top - this.margin.bottom;

  constructor(private http: HttpClient, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.http.get('assets/data/test-data.json').subscribe((data: any) => {
      this.data = data.attendanceData;
      this.createSvg();
      this.drawLine(this.data);
    });
  }

  private createSvg(): void {
    this.svg = d3.select(this.elementRef.nativeElement)
      .select('figure#line')
      .append('svg')
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
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);

    const line = d3.line<any>()
      .x((d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .y((d: any) => y(d.attendance));

    this.svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', '#9F40CE')
      .attr('stroke-width', 2)
      .attr('d', line);

    this.svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr('cy', (d: any) => y(d.attendance))
      .attr('r', 5)
      .attr('fill', '#212121');

    this.svg.append('line')
      .attr('x1', (x(filteredData[filteredData.length - 1].week) || 0) + x.bandwidth() / 2)
      .attr('x2', (x('21/10') || 0) + x.bandwidth() / 2)
      .attr('y1', y(filteredData[filteredData.length - 1].attendance))
      .attr('y2', y(55))
      .attr('stroke', '#9F40CE')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4');
  }

}
