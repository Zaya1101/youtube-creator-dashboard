export default async function getAudienceDemographics(accessToken: string, startDate: string, endDate: string, signal: AbortSignal) {
  const userInfo = await fetch("https://youtubeanalytics.googleapis.com/v2/reports"
    + "?dimensions=ageGroup%2Cgender"
    + `&startDate=${startDate}`
    + `&endDate=${endDate}`
    + "&ids=channel%3D%3DMINE"
    + "&metrics=viewerPercentage"
    + `&token${accessToken}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    signal: signal
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    }
  )
  return userInfo;
}