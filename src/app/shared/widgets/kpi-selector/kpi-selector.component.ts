import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { FormControl } from "@angular/forms";

export interface Kpi {
  value: string;
  ind_id: number;
  enabled: boolean;
}

export interface KpaGroup {
  value: string;
  kpi: Kpi[];
  ind_id: number;
}

@Component({
  selector: "app-kpi-selector",
  templateUrl: "./kpi-selector.component.html",
  styleUrls: ["./kpi-selector.component.css"]
})
export class KpiSelectorComponent implements OnInit, OnChanges {
  @Input()
  controls: any;
  @Input()
  dictionary: any;
  @Input()
  emitFirst: boolean;
  @Output()
  kpiChange = new EventEmitter<number>();

  kpiControl = new FormControl();
  kpaGroups: KpaGroup[];
  selectorPlaceholder: string;

  constructor() {}

  setKpiSelector(): void {
    const kpiSelector = this.controls.find(
      c => c.control_type == "hierarchical-selector"
    );
    if (!kpiSelector.enabled) {
      this.kpiControl.disable();
    }
    this.selectorPlaceholder = kpiSelector.name;
    this.kpaGroups = this.dictionary.kpa;
    kpiSelector.values.forEach((kpa: any) => {
      kpa.kpi.forEach((kpi: any) => {
        if (kpi.selected == true) {
          this.kpiControl.setValue(kpi.ind_id);
        }
        this.kpaGroups
          .find(e => e.ind_id == kpa.ind_id)
          .kpi.find(k => k.ind_id == kpi.ind_id).enabled = kpi.enabled;
      });
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    if (!this.kpiControl.value) {
      this.setKpiSelector();
      if (this.emitFirst) {
        this.kpiChange.emit(this.kpiControl.value);
      }
    }
  }

  onChange(newVal) {
    this.kpiChange.emit(this.kpiControl.value);
  }
}
