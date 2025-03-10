"use client";

import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "~/utils/mantine";
import { getQueryClient } from "~/utils/query";

export function Providers({ children }: React.PropsWithChildren) {
  const client = getQueryClient();

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={client}>
        {children}

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
