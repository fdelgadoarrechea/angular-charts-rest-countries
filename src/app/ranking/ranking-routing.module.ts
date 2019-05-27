import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RankingDataService } from "./shared/ranking-data.service";
import { RankingTempService } from "./shared/ranking-temp.service";
import { RankingComponent } from "./ranking.component";
import { RankingChartComponent } from "./ranking-chart/ranking-chart.component";

const routes: Routes = [
  { path: "evolution", component: RankingChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RankingDataService, RankingTempService]
})
export class RankingRoutingModule {
  static components = [RankingComponent, RankingChartComponent];
}
