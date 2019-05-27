import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface Granularity {
  selection_name: string;
}

@Component({
  selector: "app-temporal-selector",
  templateUrl: "./temporal-selector.component.html",
  styleUrls: ["./temporal-selector.component.css"]
})
export class TemporalSelectorComponent implements OnInit {
  @Input()
  controls: any;

  granularityControl = new FormControl();
  granularities: Granularity[];
  selected: string;
  selectedValue: any;
  constructor() {}

  ngOnInit() {
    this.granularityControl.disable();
  }

  setTemporalSelector(): void {
    const granularitySelector = this.controls.filter(
      c => c.name == "Temporal granularity"
    )[0];
    this.granularities = granularitySelector.values;
    let result = this.granularities.filter((g: any) => g.selected == true);
    if (result.length) {
      this.granularityControl.setValue(result[0].selection_name);
    }
  }

  ngOnChanges() {
    this.setTemporalSelector();
  }
}
