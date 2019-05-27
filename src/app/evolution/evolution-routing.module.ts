import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EvolutionDataService } from "./shared/evolution-data.service";
import { EvolutionTempService } from "./shared/evolution-temp.service";
import { EvolutionComponent } from "./evolution.component";
import { EvolutionChartComponent } from "./evolution-chart/evolution-chart.component";
import { EvolutionLegendComponent } from "./evolution-legend/evolution-legend.component";
import { CurrencySelectorComponent } from "./currency-selector/currency-selector.component";

const routes: Routes = [{ path: "evolution", component: EvolutionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EvolutionDataService, EvolutionTempService]
})
export class EvolutionRoutingModule {
  static components = [
    EvolutionComponent,
    EvolutionChartComponent,
    EvolutionLegendComponent,
    CurrencySelectorComponent
  ];
}
