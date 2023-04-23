import mapJatim from "../data/data-jatim.json";
import stuntingData from "../data/data-stunting.json";
import newsData from "../data/data-berita-dummy.json";

class LoadDataTask {
  setState = null;
  year = 2023;

  load = (options, setState) => {
    this.setState = setState;
    this.year = options.year;
    if (options.mode === "news_data") {
      // do news data
      this.#processStuntingNewsData();
    } else {
      this.#processStuntingPrevalenceData();
    }
  };

  #processStuntingPrevalenceData = () => {
    const localYear = stuntingData[this.year] ? this.year : this.year - 1;
    for (let feature of mapJatim.features) {
      const name = feature.properties.KABUPATEN;
      const prevalence = stuntingData[localYear][name]
        ? stuntingData[localYear][name]
        : 0;
      feature.properties.prevalence = prevalence;
      feature.properties.color = this.#setPrevalenceColor(prevalence);
    }
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

  #processStuntingNewsData = () => {
    let localYear = this.year;
    for (let feature of mapJatim.features) {
      const name = feature.properties.KABUPATEN;
      const newsCount = newsData[localYear][name]
        ? newsData[localYear][name]
        : 0;
      feature.properties.news_count = newsCount;
      feature.properties.color = this.#setNewsDataColor(newsCount);
    }
    this.setState(mapJatim);
  };

  #setNewsDataColor = (newsCount) => {
    return newsCount > 15
      ? "#08519C"
      : newsCount > 10
      ? "#3182BD"
      : newsCount > 5
      ? "#6BAED6"
      : newsCount > 0
      ? "#BDD7E7"
      : "#DDDDDD";
  };
}

export default LoadDataTask;
