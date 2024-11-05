import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

import Card from 'components/Card'
import Button from 'components/Button';

import "./login.css";

export const Route = createFileRoute('/login/')({
  component: Login,
})

function Login() {
  return (
    <div id="Login" className="login">
      <Card title="YouTube Creator Dashboard" titleAlignment="center">
        <div className="login-card-body">
          <Link to="/dashboard">
            <Button>
              Sign In With Google
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
