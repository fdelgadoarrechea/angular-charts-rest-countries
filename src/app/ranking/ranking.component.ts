import { Component, OnInit } from "@angular/core";

// Services
import { RankingDataService } from "./shared/ranking-data.service";
import { ColorsDataService } from "../shared/services/colors-data.service";

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.component.html",
  styleUrls: ["./ranking.component.css"]
})
export class RankingComponent implements OnInit {
  ready = false;
  dCached: any;
  selectedValue: any;
  dataRanking: any;
  colorsRadarplot: any;
  title: string;
  description: any;
  controls: any;
  dictionary: any;

  constructor(
    private rankingDataService: RankingDataService,
    private colorsDataService: ColorsDataService
  ) {}

  ngOnInit() {
    this.getDataRanking();
    this.colorsRadarplot = this.colorsDataService.loadColors();
  }

  setTitle(ind_id) {
    let info = this.dCached.chart.info.find(i => i.ind_id == ind_id);
    this.title = info.title;
    this.description = info.description;
  }

  getDataRanking(): void {
    this.rankingDataService
      .getAreaPopulation()
      .subscribe(([response1, response2]) => {
        const d = response1;
        this.dCached = d;
        this.setTitle(this.rankingDataService.POPULATION);
        d.chart.datachart = response2;
        this.dataRanking = d.chart.datachart;
        this.controls = d.controls;
        this.dictionary = d.dictionary;

        this.ready = true;
      });
  }

  changeKPI(event) {
    this.selectedValue = event;
    this.setTitle(event);
  }
}
