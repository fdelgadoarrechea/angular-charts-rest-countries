import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RankingTempService {
  loadRankingTemp = () => {
    return {
      type: "ranking",
      controls: [
        {
          control_type: "hierarchical-selector",
          selection_type: "single",
          name: "Area / Population",
          enabled: true,
          values: [
            {
              ind_id: 1,
              kpi: [
                {
                  ind_id: 12,
                  selected: true,
                  enabled: true
                }
              ]
            },
            {
              ind_id: 2,
              kpi: [
                {
                  ind_id: 13,
                  selected: false,
                  enabled: true
                }
              ]
            }
          ]
        }
      ],
      chart: {
        info: [
          {
            ind_id: 12,
            title: "Population ranking",
            description: "TOP 30 of the countries with the greatest population"
          },
          {
            ind_id: 13,
            title: "Area ranking",
            description: "TOP 30 of the countries with the biggest area"
          }
        ],
        datachart: []
      },
      dictionary: {
        kpa: [
          {
            ind_id: 1,
            value: "Population",
            color_index: "population",
            kpi: [
              {
                ind_id: 12,
                value: "Population",
                units: "people"
              }
            ]
          },
          {
            ind_id: 2,
            value: "Area",
            color_index: "area",
            kpi: [
              {
                ind_id: 13,
                value: "Area",
                units: "km"
              }
            ]
          }
        ]
      }
    };
  };
}
