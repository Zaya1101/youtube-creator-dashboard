import { useEffect, useContext } from "react";
import { useNavigate } from "@tanstack/react-router";

import { UserContext } from "lib/context/userContext";
import getUserInfo from "lib/api/getUserInfo";

type CheckAuthProps = {
  children: React.ReactNode;
};

export default function CheckAuth({
  children
}: CheckAuthProps) {
  const navigate = useNavigate();

  const accessToken = window.localStorage.getItem("googleAccessToken");
  const user = useContext(UserContext);

  useEffect(() => {
    if (!accessToken) {
      navigate({
        to: "/login"
      });
    } else {
      getUserInfo(accessToken).then((userInfo) => {
        if (userInfo.error_description?.toLowerCase() === "invalid credentials") {
          window.localStorage.removeItem("googleAccessToken");
          navigate({
            to: "/login"
          });
        } else {
          user?.setGivenName(userInfo.given_name);
          user?.setPictureUrl(userInfo.picture);
        }
      });
    }
  }, [accessToken]);

  if (user?.givenName === "") {
    return null;
  } else {
    return children;
  }
}