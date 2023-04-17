import React from 'react';
import './App.css';
import Map from './components/Map';
// import Legend from './components/Legend';
const App = () => {
  return(
      <div className='container'>
        <Map/>
        {/*<Legend/>*/}
      </div>
  );
};
export default App;