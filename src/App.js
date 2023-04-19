import React, { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Loading from "./components/Loading";

const App = () => {
  return (
    <div className="container">
      <Main />
      {/*<Loading />*/}
    </div>
  );
};
export default App;
