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
      <div className="user">
        { user?.givenName }
        <img src={ user?.pictureUrl } alt={ user?.givenName } />
      </div>
    </div>
  )
}