export default async function getViewsTimeseries(accessToken: string, startDate: string, endDate: string, periodGroupBy: "day" | "week" | "month", signal: AbortSignal) {
  const userInfo = await fetch("https://youtubeanalytics.googleapis.com/v2/reports"
    + `?dimensions=${periodGroupBy}`
    + `&startDate=${startDate}`
    + `&endDate=${endDate}`
    + "&ids=channel%3D%3DMINE"
    + "&metrics=views"
    + `&token=${accessToken}`, {
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