import { Link } from '@tanstack/react-router'

import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <Link
        to="/"
        activeProps={{
          className: 'active',
        }}
        activeOptions={{ exact: true }}
      >
        Dashboard
      </Link>{' '}
      <Link
        to="/tasks"
        activeProps={{
          className: 'active',
        }}
      >
        Tasks
      </Link>
    </div>
  )
}