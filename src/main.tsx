import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { GoogleOAuthProvider } from "@react-oauth/google"

import "./assets/css/main.css"
import ContextProvider from "components/ContextProvider"

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
})

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("app")!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </GoogleOAuthProvider>
  );
}
