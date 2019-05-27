import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RankingRoutingModule } from "./ranking-routing.module";
import { ColorsDataService } from "../shared/services/colors-data.service";

@NgModule({
  imports: [SharedModule, RankingRoutingModule],
  declarations: [RankingRoutingModule.components],
  providers: [ColorsDataService]
})
export class RankingModule {}
