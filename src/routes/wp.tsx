import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wp")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
  component: () => null,
});
