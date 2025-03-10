"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { MapLoading } from "./loading";

type LatLngType = {
  latitude: number;
  longitude: number;
};

export function Map() {
  const Component = useMemo(
    () =>
      dynamic(() => import("./map").then((mod) => mod.Map), {
        loading: () => <MapLoading />,
        ssr: false,
      }),
    []
  );

  const [permission, setPermission] = useState(true);

  const { data, isLoading } = useQuery<LatLngType>({
    retry: false,
    queryKey: ["current-latlng", permission],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  });

  useEffect(() => {
    function updatePermission(state: string) {
      if (state === "granted") {
        setPermission(true);
      } else {
        setPermission(false);
      }
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        updatePermission(permissionStatus.state);

        permissionStatus.onchange = () => {
          updatePermission(permissionStatus.state);
        };
      });
  }, []);

  return isLoading ? (
    <MapLoading />
  ) : (
    <Component
      key={`map-${permission}`}
      center={data ? [data.latitude, data.longitude] : undefined}
    />
  );
}

export function Locations() {
  const Component = useMemo(
    () =>
      dynamic(() => import("./locations").then((mod) => mod.Locations), {
        loading: () => <Skeleton h={300} />,
        ssr: false,
      }),
    []
  );

  return <Component />;
}
