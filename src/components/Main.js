import React, { useState, useEffect, useRef } from "react";
import LoadDataTask from "../tasks/LoadDataTask";
import Map from "./Map";
import Legend from "./Legend";
import Loading from "./Loading";
import Navbar from "./Navbar";
import DrawerComp from "./DrawerComp";

const loadDataTask = new LoadDataTask();

const Main = () => {
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState({ year: 2023, mode: "prevalence" });
  const [key, setKey] = useState(0);
  const [drawer, setDrawer] = useState({ isOpen: false, location: "" });
  const effectRan = useRef(false);

  const firstLoad = async () => {
    console.log("firstload");
    await loadDataTask.init();
    loadDataTask.loadMapData(options, (locations) => setLocations(locations));
  };

  useEffect(() => {
    if (effectRan.current === false) {
      firstLoad();
      effectRan.current = true;
    }
  }, []);

  const handleOptionChange = (newValue) => {
    setOptions((curr) => {
      const newOptions = { ...curr, ...newValue };
      loadDataTask.loadMapData(newOptions, (locations) =>
        setLocations(locations)
      );
      return { ...curr, ...newValue };
    });
    setKey((currKey) => {
      return currKey + 1;
    });
  };

  return (
    <div className="container">
      {locations.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <DrawerComp
            state={drawer}
            setState={setDrawer}
            year={options.year}
            stuntingData={loadDataTask.stuntingData}
          />
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
