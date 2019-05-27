import { Component, OnInit } from "@angular/core";

// Services
import { EvolutionDataService } from "./shared/evolution-data.service";

@Component({
  selector: "app-evolution",
  templateUrl: "./evolution.component.html",
  styleUrls: ["./evolution.component.css"]
})
export class EvolutionComponent implements OnInit {
  controls: any;
  ready: boolean;
  startDate: any;
  datePlaceholder: any;
  selectedValue: number;
  title: any;
  endDate: any;
  temporalEvolutionToPlot1: any;
  temporalEvolutionToPlot2: any;

  description: any;
  temporal: any;
  legend: any;
  dataChartValues: any;
  axis_y: any;
  axis_x: any;
  yearAxis: number;
  entityOptions: { enabled: boolean; multiple: boolean };
  allCurrencies: any;
  currency1 = "USD";
  currency2 = "GBP";
  base = "EUR";

  setDateSelector(d): void {
    let datePicker = d.controls.find(c => c.control_type == "date-picker");
    this.startDate = datePicker.value_from;
    this.endDate = datePicker.value_to;
    this.datePlaceholder = datePicker.name;
    this.yearAxis = new Date(this.startDate).getFullYear();
  }

  findEntityValues(target) {
    let ent = this.dataChartValues.find(d => d.id == target);
    if (ent) {
      ent = ent.values;
    } else {
      ent = [];
    }
    return ent;
  }

  updateValuesToPlot(): void {
    this.temporalEvolutionToPlot1 = this.findEntityValues(1);
    this.temporalEvolutionToPlot2 = this.findEntityValues(2);
  }

  chartReady(d): void {
    this.dataChartValues = d.chart.datachart;
    this.controls = d.controls;
    this.legend = d.chart.legend;

    this.setDateSelector(d);
    this.updateValuesToPlot();

    this.title = d.chart.title;
    this.axis_y = d.chart.axis_y;
    this.axis_x = d.chart.axis_x;
    this.description = d.chart.description;
    this.ready = true;
  }

  constructor(private evolutionDataService: EvolutionDataService) {}

  getEvoJson() {
    const currencies = `${this.currency1},${this.currency2}`;
    this.evolutionDataService
      .getCurrencyData(this.base, currencies)
      .subscribe(([response1, response2, response3]) => {
        const d = response1;
        this.allCurrencies = response2;
        d.chart.datachart = response3;
        this.chartReady(d);
      });
  }

  ngOnInit() {
    this.getEvoJson();
  }

  changeBase(base) {
    this.base = base;
    this.getEvoJson();
  }

  changeCurrency(event, target) {
    this["currency" + target] = event;
    this.getEvoJson();
  }
}
