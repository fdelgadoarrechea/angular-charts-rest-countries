import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  Input
} from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "app-ranking-chart",
  templateUrl: "./ranking-chart.component.html",
  styleUrls: ["./ranking-chart.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingChartComponent implements OnInit, OnChanges {
  @ViewChild("containerRankingChart")
  chartContainer: ElementRef;
  @Input()
  data: any;
  @Input()
  colours: any;
  @Input()
  inputSort: any;
  @Input()
  rankingKpas: any;

  hostElement: any;
  width: any;
  height: any;
  margin: any;

  selectedSort: any;

  // svg containers
  container: any;
  svg: any;
  chartWrapper: any;
  private chartProps: any;

  // scales and axis
  xScale: any;
  yScale: any;
  rScale: any;

  // datasets
  rawData: any;
  dataChart: any;

  // Constant values
  cols = 6;
  rows = 5;

  cardMargin = 16;

  toollogosize = 40;
  toollogobg = 50;

  yPaddingLabel = 10;

  radius: any;
  logosize: any;

  constructor(private eltRef: ElementRef) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.data) {
      if (this.chartProps) {
        this.chartProps.svg.transition();
        this.setSortType(this.inputSort);
        this.reshapedata(this.data);
      } else {
        this.runAll();
      }
    }
  }

  runAll = () => {
    // create chart and render
    this.initChart();
  };

  initChart = () => {
    this.chartProps = {};
    this.hostElement = this.eltRef.nativeElement;
    const PARAMS = this.data;
    let chart = d3.select(".ranking-chart");

    let pad = 0.2;

    this.height = 675;
    this.width = 846;
    // this.setMargins();

    ////////// initialize scales //////////
    this.xScale = d3.scaleBand().paddingInner(pad);
    this.yScale = d3.scaleBand().paddingInner(pad);
    this.rScale = d3.scaleSqrt();

    // Initialize svg
    this.svg = chart
      .selectAll("svg")
      .data([{}])
      .enter()
      .append("svg");

    this.margin = { top: 10, right: 10, bottom: 0, left: 10 };
    let margin = this.margin;

    // External group
    this.chartWrapper = this.svg
      .selectAll("g.chartWrapper")
      .data([{}])
      .enter()
      .append("g")
      .attr("class", "chartWrapper")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    ////////// Get data from params //////////

    // Apply to svg
    this.svg
      .attr("width", this.width + this.margin.right + this.margin.left)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    // Update scales properties
    this.xScale.domain(d3.range(this.cols)).rangeRound([0, this.width]);
    this.yScale.domain(d3.range(this.rows)).rangeRound([0, this.height]);
    this.rScale
      .domain([60, 130])
      .range([20, 32])
      .clamp(true);

    // and values
    this.radius = this.rScale(this.xScale.bandwidth());
    this.logosize = this.radius * 2;

    this.setSortType(this.inputSort);
    this.reshapedata(PARAMS);

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = this.svg;
    this.chartProps.data = PARAMS;
  };

  setSortType = sortType => {
    if (sortType) {
      this.selectedSort = sortType;
    }
  };

  reshapedata = params => {
    let rawData = params || {};

    let selectedSort = this.selectedSort;

    ////////// Build the this.dataChart: drawBars //////////
    this.dataChart = rawData.sort(function(a, b) {
      return (
        b.values.filter(function(v, i) {
          return v.ind_id == selectedSort;
        })[0].ind_value -
        a.values.filter(function(v, i) {
          return v.ind_id == selectedSort;
        })[0].ind_value
      );
    });

    let selectedKPI = this.rankingKpas.find(d => {
      return d.kpi.find(e => e.ind_id == selectedSort);
    }).kpi[0];

    // Divide the values by 100
    this.dataChart.forEach(function(d, i) {
      let country = d.name;
      d.rank = i + 1;
      d.values.forEach(function(v) {
        v.formatted =
          v.ind_value < 1
            ? d3.format(".2f")(v.ind_value)
            : d3.format(".3s")(v.ind_value);
        v.tooltip =
          country +
          "<br>" +
          selectedKPI.value +
          "<br><strong>" +
          v.formatted +
          "</strong> " +
          selectedKPI.units;
      });
    });

    this.drawCards();
  };

  // Drawers
  drawCards = () => {
    let xScale = this.xScale;
    let yScale = this.yScale;
    let cols = this.cols;

    this.chartWrapper
      .selectAll("g.cards")
      .data(this.dataChart, function(d, i) {
        return d.rank;
      })
      .enter()
      .append("g")
      .attr("class", "cards")
      .merge(this.chartWrapper.selectAll("g.cards"))
      .transition()
      .attr("transform", function(d) {
        return (
          "translate(" +
          xScale((d.rank - 1) % cols) +
          "," +
          yScale(Math.floor((d.rank - 1) / cols)) +
          ")"
        );
      });

    var cards = this.chartWrapper.selectAll("g.cards");
    let colours = this.colours;
    let selectedSort = this.selectedSort;
    let colorIndex = this.rankingKpas.find(d => {
      return d.kpi.find(e => e.ind_id == selectedSort);
    }).color_index;

    cards
      .selectAll(".cardbg")
      .data(function(d, i) {
        return [d];
      })
      .enter()
      .append("rect")
      .attr("class", "cardbg")
      .attr("width", xScale.bandwidth() + this.cardMargin)
      .attr("height", yScale.bandwidth())
      .merge(cards.selectAll(".cardbg"))
      .style("fill", colours[colorIndex]);

    var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    cards
      .on("mouseover", function(d) {
        var textFor = d.values.filter(function(d) {
          return d.ind_id == selectedSort;
        })[0];

        tooltip.transition().style("opacity", 0.9);
        tooltip
          .html(textFor.tooltip)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition().style("opacity", 0);
      });

    cards
      .selectAll(".rank")
      .data(function(d, i) {
        return [d];
      })
      .enter()
      .append("text")
      .attr("class", "rank")
      .attr("x", 10)
      .attr("y", this.radius)
      .style("font-size", this.radius)
      .style("font-weight", "bold")
      .merge(cards.selectAll(".rank"))
      .text(function(d) {
        return d.rank;
      });

    cards
      .selectAll(".txtval")
      .data(function(d) {
        return d.values.filter(function(d) {
          return d.ind_id == selectedSort;
        });
      })
      .enter()
      .append("text")
      .attr("class", "txtval")
      .attr("x", xScale.bandwidth() - this.radius - this.cardMargin)
      .attr("y", yScale.bandwidth() - 10)
      .style("text-anchor", "start")
      .merge(cards.selectAll(".txtval"))
      .text(d => d.formatted);

    var yValue = cards
      .select(".txtval")
      .node()
      .getBBox().y;
    cards
      .selectAll("circle")
      .data(function(d, i) {
        return [d];
      })
      .enter()
      .append("clipPath")
      .attr("id", "ellipse-clip")
      .append("circle")
      .attr("class", "brandbg")
      .attr("cx", xScale.bandwidth() - this.radius)
      .attr("cy", yValue - this.radius - this.cardMargin)
      .attr("r", this.radius);

    cards
      .selectAll(".flag")
      .data(function(d, i) {
        return [d];
      })
      .enter()
      .append("image")
      .attr("class", "flag")
      .attr("width", this.logosize + 13)
      .attr("height", this.logosize + 13)
      .attr("x", xScale.bandwidth() - 4 - this.radius - this.cardMargin * 2)
      .attr("y", yValue - this.logosize - this.cardMargin - 6)
      .attr("clip-path", "url(#ellipse-clip)")
      .attr("xlink:href", function(d) {
        return d.icon;
      });

    cards
      .append("circle")
      .attr("cx", xScale.bandwidth() - this.radius)
      .attr("cy", yValue - this.radius - this.cardMargin)
      .attr("r", this.radius)
      .style("stroke", "#4F81BD")
      .style("stroke-width", 7)
      .style("fill", "none");
  };
}
