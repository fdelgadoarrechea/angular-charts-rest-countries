import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";

export interface Section {
  name: string;
  value: string;
  icon: string;
}

@Component({
  selector: "app-my-selection",
  templateUrl: "./my-selection.component.html",
  styleUrls: ["./my-selection.component.css"]
})
export class MySelectionComponent implements OnInit {
  folders: Section[] = [
    {
      name: "Airsports",
      value: "Main airports",
      icon: "airspace"
    },
    {
      name: "Temporal scope",
      value: "2017",
      icon: "temporal"
    },
    {
      name: "EUR countries",
      value:
        "Austria, Belgium, Cyprus, Estonia, Finland, France, Germany, Greece, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, the Netherlands, Portugal, Slovakia, Slovenia and Spain.",
      icon: "kpi"
    },
    {
      name: "Inflation",
      value: "1.9%",
      icon: "icon-candlestick-active"
    }
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "airspace",
      sanitizer.bypassSecurityTrustResourceUrl(
        "./assets/icons/icon-airspace.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "temporal",
      sanitizer.bypassSecurityTrustResourceUrl(
        "./assets/icons/icon-temporal.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "kpi",
      sanitizer.bypassSecurityTrustResourceUrl("./assets/icons/icon-kpi.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-candlestick-active",
      sanitizer.bypassSecurityTrustResourceUrl(
        "./assets/icons/icon-candlestick-active.svg"
      )
    );
  }

  ngOnInit() {}
}
