import { createFileRoute, redirect } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"
import { Dashboard } from "./dashboard"

export const Route = createFileRoute("/")({
  component: Dashboard,
});
