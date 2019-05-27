import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EvolutionTempService {
  loadEvolutionControls = () => {
    return {
      type: "temporal_evolution",
      controls: [
        {
          control_type: "date-picker",
          selection_type: "interval",
          name: "Temporal interval",
          enabled: false,
          value_from: "2018-01-01",
          value_to: "2018-12-31"
        }
      ],
      chart: {
        title: "Currency historical rates for a time period",
        description:
          "Data retrieved from the Exchange rates API, a free service for current and historical foreign exchange rates published by the European Central Bank",
        axis_x: {
          title: "Month"
        },
        axis_y: {
          title: "Rates"
        },
        legend: {
          average: "Average",
          median: "Median",
          quartile: "2nd and 3rd quartiles"
        }
      }
    };
  };
}
