import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useGoogleLogin } from '@react-oauth/google';

import Card from 'components/Card'
import Button from 'components/Button';

import "./login.css";
import getUserInfo from 'lib/api/getUserInfo';

export const Route = createFileRoute('/login/')({
  component: Login,
})

function Login() {
  const navigate = useNavigate();

  const loginToGoogle = useGoogleLogin({
    scope: "openid profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload",
    onError: (error) => {
      console.error(error);
    },
    onSuccess: async (response) => {
      const userInfo = await getUserInfo(response.access_token);
      window.localStorage.setItem("googleAccessToken", response.access_token);
      navigate({
        to: "/dashboard"
      });
    }
  });

  return (
    <div id="Login" className="login">
      <Card title="YouTube Creator Dashboard" titleAlignment="center">
        <div className="login-card-body">
          <Button onClick={loginToGoogle}>
            Sign In With Google
          </Button>
        </div>
      </Card>
    </div>
  );
}
