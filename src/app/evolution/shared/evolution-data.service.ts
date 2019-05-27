import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import * as d3 from "d3";

@Injectable({
  providedIn: "root"
})
export class EvolutionDataService {
  private restAllUrl = `${environment.countriesApiUrl}all?fields=currencies
  `;
  private currencyUrl = `${
    environment.currencyApiUrl
  }history?start_at=2018-01-01&end_at=2018-12-31&`;
  private evolutioncontrols = "api/evolutioncontrols";

  ATFMDELAY = 13;
  HFEACTUAL = 15;
  HFEPLANNED = 16;

  constructor(private http: HttpClient) {}

  mapCurrenciesData(d: any): any {
    const allCurrencies = d
      .map(country => {
        return country.currencies.map(currency => currency.code);
      })
      .flat()
      .sort(function(a, b) {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    let x = allCurrencies =>
      allCurrencies.filter((v, i) => allCurrencies.indexOf(v) === i);
    return x(allCurrencies);
  }

  mapMonths(currencyISO: string, rates: any): any {
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];
    const dateRange = Object.keys(rates);
    return months.map(month => {
      const monthRange = dateRange.filter(
        m => m.indexOf("-" + month + "-") >= 0
      );
      return {
        average: d3.mean(monthRange.map(date => rates[date][currencyISO])),
        time: "2018-" + month,
        median: d3.median(monthRange.map(date => rates[date][currencyISO])),
        quartile_1: d3.quantile(
          monthRange.map(date => rates[date][currencyISO]),
          0.25
        ),
        quartile_3: d3.quantile(
          monthRange.map(date => rates[date][currencyISO]),
          0.75
        )
      };
    });
  }

  mapHistoricalCurrencies(d: any, currencies: string): any {
    const isoCodes = currencies.split(",");
    const firstEntries = this.mapMonths(isoCodes[0], d.rates);
    const secondEntries = this.mapMonths(isoCodes[1], d.rates);

    return [{ id: 1, values: firstEntries }, { id: 2, values: secondEntries }];
  }

  getTemporalEvolutionData(): Observable<any> {
    return this.http.get(this.evolutioncontrols);
  }
  getCurrencyData(base: string, currencies: string): any {
    return forkJoin(
      this.getTemporalEvolutionData(),
      this.getAllCountries(),
      this.getSelectedCurrencies(base, currencies)
    );
  }

  getAllCountries(): Observable<any> {
    return this.http
      .get(this.restAllUrl)
      .pipe(map((d: any) => this.mapCurrenciesData(d)));
  }

  getSelectedCurrencies(base: string, currencies: string): Observable<any> {
    return this.http
      .get(`${this.currencyUrl}base=${base}&symbols=${currencies}`)
      .pipe(map((d: any) => this.mapHistoricalCurrencies(d, currencies)));
  }
}
