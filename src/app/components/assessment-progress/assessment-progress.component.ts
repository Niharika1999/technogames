import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

// Interface for the assessment data structure
interface AssessmentData {
  name: string;
  pending: number;
  completed: number;
}
// Interface for the legend data
interface LegendData {
  name: string;
  color: string;
}

@Component({
  selector: 'app-assessment-progress',
  templateUrl: './assessment-progress.component.html',
  styleUrls: ['./assessment-progress.component.css'],
  encapsulation: ViewEncapsulation.None  // Ensures custom styles are not encapsulated
})
export class AssessmentProgressComponent {
  private data: any[] = [];
  private svg: any;
  private margin = { top: 30, right: 0, bottom: 20, left: 50 }; 
  //private width = 750 - this.margin.left - this.margin.right;
  private width!: number;
  // private height = 250 - this.margin.top - this.margin.bottom;
  private height!: number;
  private resizeListener: any;

  constructor(private http: HttpClient, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.http.get('assets/data/test-data.json').subscribe((data: any) => {
      this.data = data.assessmentProgressData;
      this.createSvg();
      this.addLegend();
      this.drawBars(this.data);
    });
    this.resizeListener = () => this.updateChartOnResize();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  // Function: initializes the chart using D3.js
  private createSvg(): void {
    const figure = d3.select(this.elementRef.nativeElement).select("figure#bar");
    //Dynamic allocation of chart dimensions
    this.width = parseInt(figure.style('width'), 10) - this.margin.left - this.margin.right;
  
    //Adjusting the graoh dimensions for smaller screens sizes 
    if (this.width < 500) {
      this.height = this.width / 1.5; 
    } else {
      this.height = this.width / 2; 
    }
  
    figure.selectAll('*').remove();
  
    //Creates svg container
    this.svg = figure.append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  
  // Function: Draws bars on the chart for 'completed' and 'pending' assessments
  private drawBars(data: AssessmentData[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.1);
  
    // Appends x-axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));
  
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);
      
  
    // Appends y-axis
    this.svg.append('g')
      .call(d3.axisLeft(y).ticks(4).tickFormat(d => d + '%'));
  
    //Y-axis grids
    const gridLines = [0, 20, 40, 60,80, 100];
    gridLines.forEach(tickValue => {
      this.svg.append('line')
        .attr('x1', 0)
        .attr('x2', this.width)
        .attr('y1', y(tickValue))
        .attr('y2', y(tickValue))
        .attr('class', 'line-grid'); 
    });
  
    //Completed Bars 
    this.svg.selectAll('bars-completed')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: AssessmentData) => x(d.name) || 0)
      .attr('y', (d: AssessmentData) => y(d.completed))
      .attr('width', x.bandwidth() / 2)
      .attr('height', (d: AssessmentData) => this.height - y(d.completed))
      .attr('class', 'rect-completed'); 
  
    //Pending Bars 
    this.svg.selectAll('bars-pending')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: AssessmentData) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', (d: AssessmentData) => y(d.pending))
      .attr('width', x.bandwidth() / 2)
      .attr('height', (d: AssessmentData) => this.height - y(d.pending))
      .attr('class', 'rect-pending'); 
  }

  // Function: To add legend for better understandingg of the bar colors
  private addLegend(): void {
    const legendData: LegendData[] = [
      { name: 'Completed', color: '#91B07C' },
      { name: 'Pending', color: '#E8E8E8' }
    ];
  
    const legend = this.svg.append('g')
      .attr('transform', `translate(${this.width / 2 - 100}, -30)`)
      .attr('class', 'legend');
  
    //Rectangle
    legend.selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d: LegendData, i: number) => i * 100)
      .attr('class', 'legend-rect') 
      .attr('fill', (d: LegendData) => d.color); 
  
    //Text
    legend.selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d: LegendData, i: number) => i * 100 + 30)
      .attr('y', 12)
      .text((d: LegendData) => d.name)
      .attr('class', 'legend-text'); 
  }

  // Function: To update the size of graphs to the screen size(Responsive design)
  private updateChartOnResize(): void {
   
    this.createSvg();
    this.addLegend();
    this.drawBars(this.data);
  }

}
