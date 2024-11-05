import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router"

import Card from "components/Card";
import CheckAuth from "components/CheckAuth";
import PieChart from "components/PieChart";

import "./dashboard.css";
import LineChart from "components/LineChart";

import getViewsTimeseries from "lib/api/getViewsTimeseries";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
})

export function Dashboard() {

  const [ viewsData, setViewsData ] = useState([]);

  useEffect(() => {
    if (viewsData?.length === 0) {
      const getViewsTimeseriesData = async () => {
        const startDate = "2024-01-01";
        const endDate = "2024-11-01";
        const periodGroupBy = "month";
        const accessToken = localStorage.getItem("googleAccessToken") ?? "";
        const data = await getViewsTimeseries(accessToken, startDate, endDate, periodGroupBy);
    
        return data.rows;
      };
      getViewsTimeseriesData()
        .then((data) => {
          console.log(data);
          setViewsData(data);
        });
    }
  }, [viewsData, setViewsData]);

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
              <p>Per Month</p>
              <LineChart 
                chartData={viewsData} 
                total={600}
              />
            </Card>
          </div>
        </div>
      </div>
    </CheckAuth>
  );
}
