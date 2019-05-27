import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RankingDataService {
  private rankingUrl = "api/ranking";
  private restAllUrl = `${
    environment.countriesApiUrl
  }all?fields=name;population;area;flag
  `;
  POPULATION = 12;
  AREA = 13;

  constructor(private http: HttpClient) {}

  mapMbIndexNoTopData(d: any): any {
    const topPopulation = d
      .sort(function(a, b) {
        if (a.population > b.population) {
          return 1;
        }
        if (a.population < b.population) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
      .reverse();

    const top30Population = topPopulation.slice(0, 30);
    return top30Population.map(country => {
      return {
        name: country.name,
        icon: country.flag,
        values: [
          {
            ind_id: 12,
            ind_value: country.population
          },
          {
            ind_id: 13,
            ind_value: country.area
          }
        ]
      };
    });
  }

  getRankingData(): Observable<any> {
    return this.http.get(this.rankingUrl);
  }

  getAllCountries(): Observable<any> {
    return this.http
      .get(this.restAllUrl)
      .pipe(map((d: any) => this.mapMbIndexNoTopData(d)));
  }

  getAreaPopulation(): any {
    return forkJoin(this.getRankingData(), this.getAllCountries());
  }
}
