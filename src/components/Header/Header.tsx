import { useContext } from "react";

import { Link } from "@tanstack/react-router"

import { UserContext } from "lib/context/userContext";

import "./header.css";

export default function Header() {
  const user = useContext(UserContext);
  return (
    <div className="header">
      <Link
        to="/dashboard"
        activeProps={{
          className: "active",
        }}
        activeOptions={{ exact: true }}
      >
        Dashboard
      </Link>{" "}
      <Link
        to="/tasks"
        activeProps={{
          className: "active",
        }}
      >
        Tasks
      </Link>
      <div className="user">
        { user?.givenName }
        <img src={ user?.pictureUrl } alt={ user?.givenName } />
      </div>
    </div>
  )
}