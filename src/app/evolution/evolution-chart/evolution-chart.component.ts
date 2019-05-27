import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild
} from "@angular/core";
import * as d3 from "d3";

export class TemporalEvolution {
  time: string | Date;
  average: number;
  median: number;
  quartile_1: number;
  quartile_3: number;
  tooltip: string;
}

@Component({
  selector: "app-evolution-chart",
  templateUrl: "./evolution-chart.component.html",
  styleUrls: ["./evolution-chart.component.css"]
})
export class EvolutionChartComponent implements OnChanges {
  @ViewChild("chart")
  chartElement: ElementRef;

  // parseDate = d3.timeParse("%d-%m-%Y");
  parseDate = d3.timeParse("%Y-%m");

  @Input()
  country1: string;
  @Input()
  country2: string;
  @Input()
  evolutionData1: TemporalEvolution[];
  @Input()
  evolutionData2: TemporalEvolution[];

  private chartProps: any;

  COLOR1 = "#004481";
  COLOR2 = "#F7893B";
  prevData1: TemporalEvolution[];
  prevData2: TemporalEvolution[];

  constructor() {}

  ngOnChanges() {
    if (this.evolutionData1 && this.chartProps) {
      this.updateChart();
    } else if (this.evolutionData1) {
      this.buildChart();
    }
  }

  formatDate() {
    this.evolutionData1.forEach(ms => {
      if (typeof ms.time === "string") {
        ms.time = this.parseDate(ms.time);
      }
    });
    this.evolutionData2.forEach(ms => {
      if (typeof ms.time === "string") {
        ms.time = this.parseDate(ms.time);
      }
    });
  }

  setTooltipText(d, target) {
    return (
      "<strong>" +
      this["country" + target] +
      "</strong><br>Average: " +
      d3.format(".3f")(d.average) +
      "<br>Median: " +
      d3.format(".3f")(d.median) +
      "<br>1st quartile: " +
      d3.format(".3f")(d.quartile_1) +
      "<br>3rd quartile: " +
      d3.format(".3f")(d.quartile_3)
    );
  }

  formatTooltip() {
    const _this = this;
    this.evolutionData1.forEach(function(d) {
      d.tooltip = _this.setTooltipText(d, 1);
    });
    this.evolutionData2.forEach(function(d) {
      d.tooltip = _this.setTooltipText(d, 2);
    });
  }

  renderCircles(_this, target) {
    this.formatTooltip();

    this.chartProps.svg
      .selectAll("line-circle")
      .data(_this["evolutionData" + target])
      .enter()
      .append("circle")
      .attr("class", "data-circle circle" + target)
      .attr("r", 5)
      .attr("cx", function(d) {
        return _this.chartProps.x(d.time);
      })
      .attr("cy", function(d) {
        return _this.chartProps.y(d.average);
      })
      .style("fill", this["COLOR" + target]);

    var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var circles = this.chartProps.svg.selectAll(".data-circle");
    circles
      .on("mouseover", function(d) {
        tooltip.transition().style("opacity", 0.9);
        tooltip
          .html(d.tooltip)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition().style("opacity", 0);
      });
  }

  renderQuartile(_this, target) {
    var area = d3
      .area<TemporalEvolution>()
      .x(d => this.chartProps.x(d.time))
      .y0(d => this.chartProps.y(d.quartile_1))
      .y1(d => this.chartProps.y(d.quartile_3));

    this.chartProps.svg
      .append("path")
      .datum(_this["evolutionData" + target])
      .attr("class", "data-quartile quartile" + target)
      .attr("fill", this["COLOR" + target])
      .style("fill-opacity", 0.3)
      .attr("d", area);

    this.chartProps.area = area;
  }

  renderLine(_this, target) {
    this.chartProps.svg
      .append("path")
      .attr("class", "line line" + target)
      .style("stroke", _this["COLOR" + target])
      .style("fill", "none")
      .attr("d", _this.chartProps.valueline(_this["evolutionData" + target]));
  }

  // gridlines in x axis function
  make_x_gridlines() {
    return d3.axisBottom(this.chartProps.x);
  }

  // gridlines in y axis function
  make_y_gridlines() {
    return d3.axisLeft(this.chartProps.y);
  }

  buildChart() {
    this.chartProps = {};
    this.formatDate();

    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 846 - margin.left - margin.right,
      height = 540 - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    var xAxis = d3
      .axisBottom(this.chartProps.x)
      .tickFormat(d3.timeFormat("%b"));
    var yAxis = d3.axisLeft(this.chartProps.y);

    let _this = this;

    // Define the line
    var valueline = d3
      .line<TemporalEvolution>()
      .x(function(d) {
        if (d.time instanceof Date) {
          return _this.chartProps.x(d.time.getTime());
        }
      })
      .y(function(d) {
        return _this.chartProps.y(d.median);
      });

    var svg = d3
      .select(this.chartElement.nativeElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);

    // Scale the range of the data
    this.chartProps.x.domain(this.getXdomain());
    this.chartProps.y.domain(this.getYdomain());

    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;

    this.renderLine(_this, 1);
    this.renderLine(_this, 2);

    // add the X gridlines
    this.chartProps.svg
      .append("g")
      .attr("class", "grid xaxis")
      .attr("fill", "#F7893B")
      .style("fill-opacity", 0.3)
      .attr("transform", "translate(0," + height + ")")
      .call(
        _this
          .make_x_gridlines()
          .tickSize(-height)
          .tickFormat((d: any) => "")
      );

    // add the Y gridlines
    this.chartProps.svg
      .append("g")
      .attr("class", "grid yaxis")
      .attr("fill", "#F7893B")
      .style("fill-opacity", 0.3)
      .call(
        _this
          .make_y_gridlines()
          .tickSize(-width)
          .tickFormat((d: any) => "")
      );

    // Add the X Axis
    this.chartProps.svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    // Add the Y Axis
    this.chartProps.svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);

    this.renderQuartile(_this, 1);
    this.renderQuartile(_this, 2);
    this.renderCircles(_this, 1);
    this.renderCircles(_this, 2);

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
    this.chartProps.width = width;
    this.prevData1 = this.evolutionData1;
    this.prevData2 = this.evolutionData2;
  }

  updateCircles(_this, target) {
    let evoCircleSelect = this.chartProps.svg
      .selectAll(".circle" + target)
      .data(_this["evolutionData" + target]);

    if (_this["prevData" + target].length == 0) {
      this.renderCircles(_this, target);
    } else {
      evoCircleSelect
        .transition()
        .attr("r", 5)
        .attr("cx", function(d) {
          return _this.chartProps.x(d.time);
        })
        .attr("cy", function(d) {
          return _this.chartProps.y(d.average);
        })
        .style("fill", this["COLOR" + target]);
    }
    // Remove old
    evoCircleSelect.exit().remove();
  }

  updateQuartiles(_this, target) {
    let evoQuartileSelect = this.chartProps.svg
      .selectAll(".quartile" + target)
      .datum(_this["evolutionData" + target]);

    evoQuartileSelect
      .transition()
      .attr("fill", this["COLOR" + target])
      .style("fill-opacity", 0.3)
      .attr("d", _this.chartProps.area);
  }

  getXdomain() {
    let _this = this;
    return d3.extent(_this.evolutionData1, function(d) {
      if (d.time instanceof Date) return (d.time as Date).getTime();
    });
  }

  getYdomain() {
    let _this = this;
    return [
      d3.min([
        d3.min(_this.evolutionData1, (d: any) => d.quartile_1),
        d3.min(_this.evolutionData2, (d: any) => d.quartile_1)
      ]),
      d3.max([
        d3.max(_this.evolutionData1, (d: any) => d.quartile_3),
        d3.max(_this.evolutionData2, (d: any) => d.quartile_3),
        d3.max(_this.evolutionData1, (d: any) => d.average),
        d3.max(_this.evolutionData2, (d: any) => d.average)
      ])
    ];
  }

  updateLine(_this, target) {
    this.chartProps.svg
      .select(".line.line" + target) // update the line 1
      .attr("d", _this.chartProps.valueline(_this["evolutionData" + target]));
  }

  updateChart() {
    let _this = this;
    this.formatDate();

    // Scale the range of the data
    this.chartProps.x.domain(this.getXdomain());
    this.chartProps.y.domain(this.getYdomain());

    // Select the section we want to apply our changes to
    this.chartProps.svg.transition();

    // Make the changes to the line chart
    this.updateLine(_this, 1);
    this.updateLine(_this, 2);

    this.chartProps.svg
      .select(".x.axis") // update x axis
      .call(this.chartProps.xAxis);

    this.chartProps.svg
      .select(".y.axis") // update y axis
      .call(this.chartProps.yAxis);

    //update grid
    this.chartProps.svg.select(".grid.yaxis").call(
      _this
        .make_y_gridlines()
        .tickSize(-_this.chartProps.width)
        .tickFormat((d: any) => "")
    );

    //Update all circles
    this.updateQuartiles(_this, 1);
    this.updateQuartiles(_this, 2);

    //Update all circles
    this.updateCircles(_this, 1);
    this.updateCircles(_this, 2);

    this.formatTooltip();

    this.prevData1 = this.evolutionData1;
    this.prevData2 = this.evolutionData2;
  }
}
