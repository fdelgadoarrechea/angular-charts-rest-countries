import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { EvolutionRoutingModule } from "./evolution-routing.module";

@NgModule({
  imports: [SharedModule, EvolutionRoutingModule],
  declarations: [EvolutionRoutingModule.components]
})
export class EvolutionModule {}
