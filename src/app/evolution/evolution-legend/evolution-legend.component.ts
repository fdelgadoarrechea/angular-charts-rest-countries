import { Component, OnChanges, Input } from "@angular/core";

@Component({
  selector: "app-evolution-legend",
  templateUrl: "./evolution-legend.component.html",
  styleUrls: ["./evolution-legend.component.css"]
})
export class EvolutionLegendComponent implements OnChanges {
  @Input() legend: any;
  @Input() currency1: any;
  @Input() currency2: any;

  lgndtxt: any;

  constructor() {}

  ngOnChanges() {
    this.lgndtxt = this.legend;
  }
}
