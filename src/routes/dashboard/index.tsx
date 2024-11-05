import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

import Card from "components/Card";
import CheckAuth from "components/CheckAuth";
import PieChart from "components/PieChart";

import "./dashboard.css";
import LineChart from "components/LineChart";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <CheckAuth>
      <div id="Dashboard">
        <div className="dashboard-container fade-in">
          <div className="dashboard-grid-col-1">
            <Card title="Recent Comments" className="recent-comments-widget">
              <p>There are no comments yet.</p>
            </Card>
          </div>
          <div className="dashboard-grid-col-2">
            <Card title="Likes/Dislikes" className="likes-dislikes-widget">
              <PieChart chartData={[{ name: "Likes", value: 10 }, { name: "Dislikes", value: 5 }]} total={15} />
            </Card>
            <Card title="Audience Breakdown" className="audience-widget">
              <PieChart 
                chartData={[
                  {
                    name: "Male",
                    value: 50
                  },
                  {
                    name: "Female",
                    value: 40
                  }
                ]} 
                total={90}
              />
            </Card>
            <Card title="Total Views" className="total-views-widget">
              <LineChart 
                chartData={[
                  {
                    name: "Jan",
                    value: 100
                  },
                  {
                    name: "Feb",
                    value: 200
                  },
                  {
                    name: "Mar",
                    value: 300  
                  }
                ]} 
                total={600}
              />
            </Card>
          </div>
        </div>
      </div>
    </CheckAuth>
  );
}
