import { Injectable } from "@angular/core";

import { InMemoryDbService } from "angular-in-memory-web-api";
import { RankingTempService } from "../../ranking/shared/ranking-temp.service";
import { EvolutionTempService } from "../../evolution/shared/evolution-temp.service";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  temporalEvolutionData: any;

  constructor(
    private rankingTempService: RankingTempService,
    private evolutionTempService: EvolutionTempService
  ) {}

  createDb() {
    const ranking = this.rankingTempService.loadRankingTemp();
    const evolutioncontrols = this.evolutionTempService.loadEvolutionControls();

    return {
      ranking,
      evolutioncontrols
    };
  }
}
