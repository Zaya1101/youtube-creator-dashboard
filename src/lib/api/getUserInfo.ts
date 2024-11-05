import { UserInfo } from "types";

export default async function getUserInfo(accessToken: string) {
  const userInfo: UserInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    }
  )
  return userInfo;
}