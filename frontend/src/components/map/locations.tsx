import { Card, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LocationType } from "~/types/location";
import { PaginatedResponseType } from "~/types/uri";
import { useMapContext } from "./context";

export function Locations() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const { map } = useMapContext();

  const { data } = useQuery<PaginatedResponseType<LocationType>>({
    queryKey: ["locations"],
  });

  return data?.data.map((location, key) => {
    return (
      <Card
        key={key}
        withBorder
        bg={selectedLocation === key ? "gray.0" : undefined}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedLocation(key);
          map?.setView([location.latitude, location.longitude], map?.getZoom());
        }}
      >
        <Stack gap={2}>
          <Text fw={600}>{location.name}</Text>

          <Text fz="sm" c="gray">
            {location.address}
          </Text>
        </Stack>
      </Card>
    );
  });
}
