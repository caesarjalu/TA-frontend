import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import features from "../data/data-jatim.json";
import "./Map.css";
//import 'bootstrap/dist/css/bootstrap.min.css';

const Map = () => {
  const mapStyle = {
    height: "100vh",
    width: "100%",
    margin: "0 auto",
  };

  const maxBounds = [
    [-4.721113949189322, 107.8411522825802], // South West
    [-10.721113949189322, 117.8411522825802], // North East
  ];

  return (
    <div className="container">
      <div className="header">
        <h2 className="heading">Stunting Jawa Timur</h2>
      </div>
      <div className="">
        <div className="">
          <MapContainer
            center={[-7.721113949189322, 112.8411522825802]}
            zoom={8}
            scrollWheelZoom={true}
            style={mapStyle}
            minZoom={7}
            maxZoom={13}
            maxBounds={maxBounds}
          >
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={features} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
export default Map;
