import { Component, OnInit } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { pluck } from "rxjs/operators";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError
} from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  public isSmallScreen: boolean;
  euroClass: string;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.euroClass = event.url.substr(1);
      }
    });
    iconRegistry.addSvgIcon(
      "ranking",
      sanitizer.bypassSecurityTrustResourceUrl(
        "./assets/icons/icon-pru-index.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "evolution",
      sanitizer.bypassSecurityTrustResourceUrl(
        "./assets/icons/icon-pru-evolution.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "scatterplot",
      sanitizer.bypassSecurityTrustResourceUrl(
        "./assets/icons/icon-pru-matrix.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "barplot",
      sanitizer.bypassSecurityTrustResourceUrl(
        "./assets/icons/icon-pru-comparison.svg"
      )
    );
  }

  ngOnInit() {
    this._breakpointObserver
      .observe(["(max-width: 901px)"])
      .pipe(pluck("matches"))
      .subscribe((m: boolean) => (this.isSmallScreen = m));
  }

  get sidenavMode() {
    return this.isSmallScreen ? "over" : "side";
  }
}
