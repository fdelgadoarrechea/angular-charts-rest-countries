import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";

// Services
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./shared/services/in-memory-data.service";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LayoutModule } from "@angular/cdk/layout";
import { AppMaterialModule } from "./app-material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";

// Pages
import { HomeComponent } from "./home/home.component";
import { ChartMenuComponent } from "./chart-menu/chart-menu.component";
import { EvolutionModule } from "./evolution/evolution.module";
import { RankingModule } from "./ranking/ranking.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
      dataEncapsulation: false
    }),
    NoopAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    SharedModule,
    EvolutionModule,
    RankingModule
  ],
  declarations: [AppComponent, HomeComponent, ChartMenuComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
