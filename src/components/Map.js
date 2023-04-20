import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import stuntingData from "../data/data-stunting.json";

const Map = ({ province, key, options }) => {
  const mapStyle = {
    weight: 1,
    color: "black",
    fillOpacity: 0.7,
  };

  const maxBounds = [
    [-4.721113949189322, 107.8411522825802], // South West
    [-10.721113949189322, 117.8411522825802], // North East
  ];

  const onEachProvince = (feature, layer) => {
    layer.options.fillColor = feature.properties.color;
    const name = feature.properties.KABUPATEN;
    let number;
    let ending;
    if (options.mode === "prevalence") {
      number = feature.properties.prevalence;
      ending = "%";
    } else {
      number = feature.properties.news_count;
      ending = " berita";
    }
    layer.bindTooltip(`${name} : ${number}${ending}`, { sticky: true });
    layer.on({
      click: (e) => {
        clickOnProvince(e, feature.properties);
      },
    });
  };

  const clickOnProvince = (e, properties) => {
    const name = properties.KABUPATEN;
    let localYear = options.year;
    if (!stuntingData[options.year]) {
      localYear = options.year - 1;
    }
    console.log(`${name} : ${stuntingData[localYear][name]}`);
  };

  return (
    <MapContainer
      center={[-7.721113949189322, 112.8411522825802]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "91vh", width: "100%", margin: "0 auto" }}
      minZoom={7}
      maxZoom={13}
      maxBounds={maxBounds}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={key}
        data={province}
        style={mapStyle}
        onEachFeature={onEachProvince}
      />
    </MapContainer>
  );
};
export default Map;
