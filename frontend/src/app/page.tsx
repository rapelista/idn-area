import { Box, Divider, Flex, ScrollArea, Stack } from "@mantine/core";
import { Filters } from "~/components/filters";
import { Locations, Map } from "~/components/map";
import { MapProvider } from "~/components/map/context";

export default function Page() {
  return (
    <Stack w="100vw" gap={0} style={{ overflow: "hidden" }}>
      <Flex flex={1}>
        <MapProvider>
          <Stack
            p="md"
            w="30vw"
            h="100vh"
            maw={768}
            style={{
              borderRight: "1px solid var(--mantine-color-default-border)",
            }}
          >
            <Filters />

            <Divider />

            <ScrollArea>
              <Stack flex={1}>
                <Locations />
              </Stack>
            </ScrollArea>
          </Stack>

          <Box flex={1}>
            <Map />
          </Box>
        </MapProvider>
      </Flex>
    </Stack>
  );
}
