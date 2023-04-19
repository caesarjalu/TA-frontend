import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import feat from "../data/data-jatim.json";
//import 'bootstrap/dist/css/bootstrap.min.css';

const Map = ({ province, key }) => {
  const mapStyle = {
    weight: 1,
    color: "black",
    fillOpacity: 0.7,
  };

  const maxBounds = [
    [-4.721113949189322, 107.8411522825802], // South West
    [-10.721113949189322, 117.8411522825802], // North East
  ];

  const onEachProvince = (province, layer) => {
    console.log("onEachProvince");
    layer.options.fillColor = province.properties.color;
    const name = province.properties.KABUPATEN;
    const number = province.properties.prevalence;
    layer.bindPopup(`${name} ${number}`);
  };

  return (
    <MapContainer
      center={[-7.721113949189322, 112.8411522825802]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "90vh", width: "100%", margin: "0 auto" }}
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
