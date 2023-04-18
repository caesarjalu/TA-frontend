import React, { useState, useEffect } from "react";
import LoadDataTask from "../tasks/LoadDataTask";
import Map from "./Map";
import Legend from "./Legend";

const Main = () => {
  const [province, setProvince] = useState([]);
  const [options, setOptions] = useState({ year: 2023, mode: "prevalence" });
  const loadDataTask = new LoadDataTask();
  const load = () => {
    loadDataTask.load(options, (province) => setProvince(province));
    console.log(province);
  };

  useEffect(load);
  return (
    <div className="container">
      <div className="header">
        <h2 className="heading">Stunting Jawa Timur</h2>
      </div>
      <div>
        <Map province={province} />
      </div>
      <div>
        <Legend />
      </div>
    </div>
  );
};

export default Main;
