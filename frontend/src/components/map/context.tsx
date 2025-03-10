"use client";

import { createContext, useContext, useState } from "react";

interface MapContextProps {
  map: L.Map | null;
  setMap: React.Dispatch<React.SetStateAction<L.Map | null>>;
}

const MapContext = createContext<MapContextProps | null>(null);

export function MapProvider({ children }: React.PropsWithChildren) {
  const [map, setMap] = useState<L.Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }

  return context;
}
