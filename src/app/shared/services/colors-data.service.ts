import { Injectable } from "@angular/core";

@Injectable()
export class ColorsDataService {
  loadColors = () => {
    const operations = {
      dark_red: "#BA0036",
      grey_dark: "#878787",
      grey_darker: "#6E6E6E",
      grey_darkest: "#3b3b3b",
      grey_light: "#C6C6C6",
      grey_lighter: "#E6E6E6",
      shared: { reg: "#FFC211", high: "#FFD456", low: "#FFF3CD" },
      cdj_stage: "rgba(230, 230, 230, 1)",
      cdj_compare: "rgba(75, 75, 75, 1)",
      area: "#fce3d4",
      population: "#D4EDFC",
      performance: "rgb(255, 152, 0, 0.5)"
    };

    return operations;
  };
}
