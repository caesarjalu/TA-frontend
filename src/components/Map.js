import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = ({ locations, options, setDrawer, updatedTime, totalNews }) => {
  const mapStyle = {
    weight: 1,
    color: "black",
    fillOpacity: 0.7,
  };

  const maxBounds = [
    [-4.721113949189322, 107.8411522825802], // South West
    [-10.721113949189322, 117.8411522825802], // North East
  ];

  const attribution = `Map Oleh <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Total Berita: ${totalNews} | Terakhir Diupdate: ${updatedTime}`;

  const onEachLocations = (feature, layer) => {
    layer.options.fillColor = feature.properties.color;
    const name = feature.properties.KABUPATEN;
    const tooltipData =
      options.mode === "news_data"
        ? `${feature.properties.news_count} berita`
        : `${feature.properties.prevalence}%`;
    layer.bindTooltip(`${name} : ${tooltipData}`, { sticky: true });
    layer.on({
      click: (e) => {
        clickOnLocation(e, feature.properties);
      },
    });
  };

  const clickOnLocation = (e, properties) => {
    setDrawer((curr) => {
      return { ...curr, isOpen: true, location: properties.KABUPATEN };
    });
  };

  return (
    <MapContainer
      center={[-7.75, 113.1]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "91vh", width: "100%", margin: "0 auto" }}
      minZoom={7}
      maxZoom={13}
      maxBounds={maxBounds}
    >
      <TileLayer
        attribution={attribution}
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={locations}
        style={mapStyle}
        onEachFeature={onEachLocations}
      />
    </MapContainer>
  );
};
export default Map;
