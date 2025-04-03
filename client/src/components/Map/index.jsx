import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef(null); // Ref do mapy

  useEffect(() => {
    // Jeśli mapa już istnieje, nie inicjalizuj ponownie
    if (mapRef.current !== null) return;

    // Pobranie elementu kontenera mapy
    const map = L.map("map", {
      center: [51.2465, 22.5684], // Lublin
      zoom: 13,
      scrollWheelZoom: true, // Pozwala na przewijanie i zoom
      dragging: true, // Możliwość przesuwania mapy
      zoomControl: true, // Kontrola zoomu
    });

    // Warstwa OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Ikona markera
    const customIcon = L.icon({
      iconUrl: "/pin.png", // Ścieżka do pinezki (wrzuć plik do /public/assets/)
      iconSize: [50, 50], // Rozmiar ikony
      iconAnchor: [25, 50], // Punkt zaczepienia (środek dolnej krawędzi)
      popupAnchor: [0, -50], // Pozycja okienka popup względem ikony
    });

    // Znacznik (marker) na mapie
    L.marker([51.24250901371327, 22.55284084120101], {icon: customIcon})
      .addTo(map)
      .bindPopup("Bike Master, Lublin")
      .openPopup();

    // Przypisanie referencji, aby uniknąć ponownej inicjalizacji
    mapRef.current = map;
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "400px",
        width: "100%",
        maxWidth: "900px",
        borderRadius: "10px",
        margin: "auto",
      }}
    />
  );
};

export default Map;
