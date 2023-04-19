import React, { useState, useEffect } from "react";
import LoadDataTask from "../tasks/LoadDataTask";
import Map from "./Map";
import Legend from "./Legend";
import Loading from "./Loading";

const Main = () => {
  const [province, setProvince] = useState([]);
  const [options, setOptions] = useState({ year: 2023, mode: "prevalence" });
  const [key, setKey] = useState(0);
  const load = () => {
    const loadDataTask = new LoadDataTask();
    loadDataTask.load(options, (province) => setProvince(province));
    // console.log(options);
  };

  useEffect(load, [options, province]);

  const handleOptionChange = (newValue) => {
    setOptions((curr) => {
      return { ...curr, ...newValue };
    });
    setKey((currKey) => {
      return currKey + 1;
    });
    // console.log(options);
  };

  return (
    <div className="container">
      {province.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <div className="header">
            <h2 className="heading">Stunting Jawa Timur</h2>
          </div>
          <div>
            <Map province={province} key={key} />
          </div>
          <div>
            <Legend setOptions={handleOptionChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
