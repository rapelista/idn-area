"use client";

import {
  MapContainer,
  MapContainerProps,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import { useQuery } from "@tanstack/react-query";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { LAT_LNG_FALLBACK } from "~/configs/site";
import { LocationType } from "~/types/location";
import { PaginatedResponseType } from "~/types/uri";
import { useMapContext } from "./context";

export function Map({ center, ...props }: MapContainerProps) {
  const { setMap } = useMapContext();

  return (
    <MapContainer
      ref={setMap}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh" }}
      center={center || LAT_LNG_FALLBACK}
      {...props}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {center && (
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}

      <Markers />
    </MapContainer>
  );
}

function Markers() {
  const { data } = useQuery<PaginatedResponseType<LocationType>>({
    queryKey: ["locations"],
  });

  return data?.data.map((location, key) => {
    return (
      <Marker position={[location.latitude, location.longitude]} key={key}>
        <Popup>
          <span style={{ fontWeight: 600 }}>{location.name}</span> <br />
          {location.address}
        </Popup>
      </Marker>
    );
  });
}
