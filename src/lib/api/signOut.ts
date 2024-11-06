export default async function signOut(accessToken: string) {
  fetch(
    `https://oauth2.googleapis.com/revoke?token=${accessToken}`,
    {
      method: "POST",
    } 
  ).then(data => data.json());
}
