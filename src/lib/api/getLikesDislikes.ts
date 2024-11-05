export default async function getLikesDislikes(accessToken: string, startDate: string, endDate: string) {
  const userInfo = await fetch("https://youtubeanalytics.googleapis.com/v2/reports"
    + `?startDate=${startDate}`
    + `&endDate=${endDate}`
    + "&ids=channel%3D%3DMINE"
    + "&metrics=likes%2Cdislikes"
    + `&token=${accessToken}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    }
  )
  return userInfo;
}