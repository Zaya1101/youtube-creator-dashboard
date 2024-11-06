import { useContext } from "react";

import { Link, useNavigate } from "@tanstack/react-router"

import { UserContext } from "lib/context/userContext";
import signOut from "lib/api/signOut";
import SignoutSvg from "assets/svgs/signout.svg";

import "./header.css";

export default function Header() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const signOutOnClick = async() => {
    const accessToken = localStorage.getItem("googleAccessToken") ?? "";
    await signOut(accessToken);
    user?.setGivenName("");
    user?.setPictureUrl("");
    navigate({
      to: "/login",
    });
  }

  if (user?.givenName === "") { return null; }
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
      <img 
        className="signout" 
        src={ SignoutSvg } 
        alt="Sign out" 
        onClick={ signOutOnClick }
      />
    </div>
  )
}