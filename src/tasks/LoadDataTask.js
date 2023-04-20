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
      console.log("News Data");
      this.#processStuntingNewsData();
    } else {
      console.log("Prevalence Data");
      this.#processStuntingPrevalenceData();
    }
  };

  #processStuntingPrevalenceData = () => {
    let localYear = this.year;
    if (!stuntingData[this.year]) {
      localYear = this.year - 1;
    }
    for (let i = 0; i < mapJatim.features.length; i++) {
      const province = mapJatim.features[i];
      const name = province.properties.KABUPATEN;
      const prevalence = stuntingData[localYear][name]
        ? stuntingData[localYear][name]
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

  #processStuntingNewsData = () => {
    let localYear = this.year;
    for (let i = 0; i < mapJatim.features.length; i++) {
      const province = mapJatim.features[i];
      const name = province.properties.KABUPATEN;
      const newsCount = newsData[localYear][name]
        ? newsData[localYear][name]
        : 0;
      province.properties.news_count = newsCount;
      province.properties.color = this.#setNewsDataColor(newsCount);
    }
    // console.log(mapJatim.features[0].properties.color);
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
