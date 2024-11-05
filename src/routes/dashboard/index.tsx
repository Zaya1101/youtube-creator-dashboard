import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

import Card from 'components/Card';

import "./dashboard.css";

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div id="Dashboard">
      <div className="dashboard-container fade-in">
        <div className="dashboard-grid-col-1">
          <Card title="Recent Comments" className="recent-comments-widget">
            <p>There are no comments yet.</p>
          </Card>
        </div>
        <div className="dashboard-grid-col-2">
          <Card title="Likes/Dislikes" className="likes-dislikes-widget">
            <p>Likes/Dislikes Chart</p>
          </Card>
          <Card title="Audience Breakdown" className="audience-widget">
            <p>Audience Breakdown Chart</p>
          </Card>
          <Card title="Total Views" className="total-views-widget">
            <p>Total Views Chart</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
