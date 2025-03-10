import { Container } from "@mantine/core";

export default function Layout({ children }: React.PropsWithChildren) {
  return <Container my="xl">{children}</Container>;
}
