import mapJatim from "../data/data-jatim.json";
import stunting_data from "../data/data-stunting.json";

class LoadDataTask {
  setState = null;
  year = 2023;

  load = (options, setState) => {
    this.setState = setState;
    this.year = options.year;
    if (options.mode === "news_data") {
      // do news data
      console.log("News Data");
      this.#processStuntingPrevalenceData();
    } else {
      console.log("Prevalence Data");
      this.#processStuntingPrevalenceData();
    }
  };

  #processStuntingPrevalenceData = () => {
    let localYear = this.year;
    if (!stunting_data[this.year]) {
      localYear = this.year - 1;
    }
    for (let i = 0; i < mapJatim.features.length; i++) {
      const province = mapJatim.features[i];
      const name = province.properties.KABUPATEN;
      const prevalence = stunting_data[localYear][name]
        ? stunting_data[localYear][name]
        : 0;
      province.properties.prevalence = prevalence;
      province.properties.color = this.#setPrevalenceColor(prevalence);
    }
    // console.log(mapJatim.features[0].properties.color);
    this.setState(mapJatim);
  };

  #setPrevalenceColor = (prevalence) => {
    return prevalence > 30.0
      ? "#ED2938"
      : prevalence > 20.0
      ? "#FF8C01"
      : prevalence > 10.0
      ? "#FFE733"
      : prevalence > 2.5
      ? "#006B3E"
      : "#024E1B";
  };
}

export default LoadDataTask;
