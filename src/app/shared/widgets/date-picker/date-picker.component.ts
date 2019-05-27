import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.css"]
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input()
  date: string;
  @Input()
  datePlaceholder: string;
  startDate = new FormControl();

  constructor() {}

  ngOnInit() {
    this.startDate.disable();
  }
  ngOnChanges() {
    this.startDate.setValue(new Date(this.date));
  }
}
