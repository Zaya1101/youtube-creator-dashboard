export default async function getSubscribers(accessToken: string) {
  const userInfo = await fetch("https://youtube.googleapis.com/youtube/v3/subscriptions"
    + "?part=subscriberSnippet"
    + "&part=snippet"
    + "&maxResults=10"
    + "&mySubscribers=true"
    + `&token${accessToken}`, {
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