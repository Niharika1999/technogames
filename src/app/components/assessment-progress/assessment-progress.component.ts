import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

interface AssessmentData {
  name: string;
  pending: number;
  completed: number;
}
interface LegendData {
  name: string;
  color: string;
}

@Component({
  selector: 'app-assessment-progress',
  templateUrl: './assessment-progress.component.html',
  styleUrls: ['./assessment-progress.component.css']
})
export class AssessmentProgressComponent {
  private data: any[] = [];
  private svg: any;
  private margin = {top: 30, right: 10, bottom: 20, left: 50};
  private width = 750 - this.margin.left - this.margin.right;
  private height = 250 - this.margin.top - this.margin.bottom;

  constructor(private http: HttpClient, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.http.get('assets/data/test-data.json').subscribe((data: any) => {
      this.data = data.assessmentProgressData;
      this.createSvg();
      this.addLegend();
      this.drawBars(this.data);
    });
  }

  private createSvg(): void {
    this.svg = d3.select(this.elementRef.nativeElement)
      .select("figure#bar")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }
 
  private drawBars(data: AssessmentData[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.3);
  
    
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));
  
    
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);
  
    
    this.svg.append('g')
      .call(d3.axisLeft(y).ticks(4).tickFormat(d => d + '%'));
  
    
    const gridLines = [0, 25, 50, 75, 100]; 
  
    gridLines.forEach(tickValue => {
      this.svg.append('line')
        .attr('x1', 0)
        .attr('x2', this.width)    
        .attr('y1', y(tickValue)) 
        .attr('y2', y(tickValue))  
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 1)
    });
  
    
    this.svg.selectAll('bars-completed')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: AssessmentData) => x(d.name) || 0)
      .attr('y', (d: AssessmentData) => y(d.completed))
      .attr('width', x.bandwidth() / 2)
      .attr('height', (d: AssessmentData) => this.height - y(d.completed))
      .attr('fill', '#94a97f'); 

   
    this.svg.selectAll('bars-pending')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: AssessmentData) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', (d: AssessmentData) => y(d.pending))
      .attr('width', x.bandwidth() / 2)
      .attr('height', (d: AssessmentData) => this.height - y(d.pending))
      .attr('fill', 'lightgray'); 
  }
  private addLegend(): void {
    const legendData: LegendData[] = [
      { name: 'Completed', color: '#94a97f' },
      { name: 'Pending', color: 'lightgray' }
    ];

    
    const legend = this.svg.append('g')
      .attr('transform', `translate(${this.width / 2 - 100}, -30)`) 
      .attr('class', 'legend');

   
    legend.selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d: LegendData, i: number) => i * 140)  
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', (d: LegendData) => d.color);

    
    legend.selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d: LegendData, i: number) => i * 140 + 25)  
      .attr('y', 12)  
      .text((d: LegendData) => d.name)
      .attr('alignment-baseline', 'middle');
  }

}
