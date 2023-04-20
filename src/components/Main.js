import React, { useState, useEffect } from "react";
import LoadDataTask from "../tasks/LoadDataTask";
import Map from "./Map";
import Legend from "./Legend";
import Loading from "./Loading";
import Navbar from "./Navbar";
import DrawerComp from "./DrawerComp";

const Main = () => {
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState({ year: 2023, mode: "prevalence" });
  const [key, setKey] = useState(0);
  const [drawer, setDrawer] = useState({ isOpen: false, location: "" });

  const load = () => {
    const loadDataTask = new LoadDataTask();
    loadDataTask.load(options, (locations) => setLocations(locations));
    // console.log(options);
  };

  useEffect(load, [options]);

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
      {locations.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <DrawerComp state={drawer} setState={setDrawer} year={options.year} />
          <div>
            <Map
              locations={locations}
              key={key}
              options={options}
              setDrawer={setDrawer}
            />
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
