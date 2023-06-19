import mapJatim from "../data/data-jatim.json";
import db from "../services/firebase";
import { getDocs, collection, getCountFromServer } from "firebase/firestore";

class LoadDataTask {
  setState = null;
  year = 2023;
  stuntingData = {};
  newsCountData = {};
  updatedTime = null;
  totalNews = 0;

  #isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  init = async () => {
    if (this.#isObjectEmpty(this.stuntingData)) {
      console.log("get prevalence");
      this.stuntingData = await this.#getDataFromFirestore("prevalence");
    }
    if (this.#isObjectEmpty(this.newsCountData)) {
      console.log("get news count");
      this.newsCountData = await this.#getDataFromFirestore("newscount");
      if (this.updatedTime === null) {
        this.updatedTime = this.newsCountData["misc"]["UpdatedAt"]
          .toDate()
          .toLocaleString("id-id");
      }
    }
    if (this.totalNews === 0) {
      this.totalNews = await this.#getTotalNews();
    }
  };

  #getDataFromFirestore = async (collectionName) => {
    try {
      const snapshot = collection(db, collectionName);
      const snapData = await getDocs(snapshot);
      const data = {};
      snapData.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  #getTotalNews = async () => {
    try {
      const coll = collection(db, "newsdata");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    } catch (e) {
      console.log(e);
    }
  };

  loadMapData = (options, setState) => {
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
    const localYear = this.stuntingData[this.year] ? this.year : this.year - 1;

    for (let feature of mapJatim.features) {
      const name = feature.properties.KABUPATEN.toLowerCase();
      const prevalence = this.stuntingData[localYear.toString()][name]
        ? this.stuntingData[localYear][name]
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
      const name = feature.properties.KABUPATEN.toLowerCase();
      const newsCount = this.newsCountData[localYear][name]
        ? this.newsCountData[localYear][name]
        : 0;
      feature.properties.news_count = newsCount;
      feature.properties.color = this.#setNewsDataColor(newsCount);
    }
    this.setState(mapJatim);
  };

  #setNewsDataColor = (newsCount) => {
    return newsCount > 20
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
