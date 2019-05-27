import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "currency-selector",
  templateUrl: "./currency-selector.component.html",
  styleUrls: ["./currency-selector.component.css"]
})
export class CurrencySelectorComponent implements OnInit {
  @Input() selectorPlaceholder: string;
  @Input() allCurrencies: any[];
  @Input() defaultCurrency: string;
  @Output() currencyChange = new EventEmitter<number>();
  currenciesControl = new FormControl();
  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    this.currenciesControl.setValue(this.defaultCurrency);
  }
  onChange() {
    this.currencyChange.emit(this.currenciesControl.value);
  }
}
