import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router"
import { format } from "date-fns";

import Card from "components/Card";
import CheckAuth from "components/CheckAuth";
import PieChart from "components/PieChart";

import "./dashboard.css";
import LineChart from "components/LineChart";

import getSubscribers from "lib/api/getSubscribers";
import getLikesDislikes from "lib/api/getLikesDislikes";
import getAudienceDemographics from "lib/api/getAudienceDemographics";
import getViewsTimeseries from "lib/api/getViewsTimeseries";

import useAbortController from "hooks/useAbortController";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
})

export function Dashboard() {

  const [ recentSubscribersData, setRecentSubscribersData ] = useState([]);
  const [ likesDislikesData, setLikesDislikesData ] = useState([]);
  const [ audienceDemographicsData, setAudienceDemographicsData ] = useState([]);
  const [ viewsData, setViewsData ] = useState([]);

  useEffect(() => {
    const { controller, signal } = useAbortController();

    if (recentSubscribersData?.length === 0) {
      const getSubscribersData = async () => {
        const accessToken = localStorage.getItem("googleAccessToken") ?? "";
        const data = await getSubscribers(accessToken, signal);
    
        return data.items;
      };
      getSubscribersData()
        .then((data) => {
          setRecentSubscribersData(data);
      });
    }
    return () => {
      controller.abort();
    }
  }, [recentSubscribersData, setRecentSubscribersData]);

  useEffect(() => {
    const { controller, signal } = useAbortController();

    if (likesDislikesData?.length === 0) {
      const getLikesDislikesData = async () => {
        const startDate = "2024-01-01";
        const endDate = "2024-11-01";
        const accessToken = localStorage.getItem("googleAccessToken") ?? "";
        const data = await getLikesDislikes(accessToken, startDate, endDate, signal);
    
        return data?.rows;
      };
      getLikesDislikesData()
        .then((data) => {
          const formattedData = data?.[0]?.map((row: number, index: number) => {
            return { 
              name: index === 0 ? "Likes" : "Dislikes", 
              value: row,
              itemStyle: {
                color: index === 0 ? "#4CAF50" : "#F44336"
              }
            }
          })
          setLikesDislikesData(formattedData);
      });

      return () => {
        controller.abort();
      }
    }
  }, [likesDislikesData, setLikesDislikesData]);

  useEffect(() => {
    const { controller, signal } = useAbortController();

    if (audienceDemographicsData?.length === 0) {
      const getAudienceDemographicsData = async () => {
        const startDate = "2024-01-01";
        const endDate = "2024-11-01";
        const accessToken = localStorage.getItem("googleAccessToken") ?? "";
        const data = await getAudienceDemographics(accessToken, startDate, endDate, signal);
    
        return data.rows;
      };
      getAudienceDemographicsData()
        .then((data) => {
          const formattedData = data.map((row: any) => {
            return { 
              name: row[0] + " " + row[1], 
              value: row[2]
            }
          });
          setAudienceDemographicsData(formattedData);
      });

      return () => {
        controller.abort();
      }
    }
  }, [audienceDemographicsData, setAudienceDemographicsData]);

  useEffect(() => {
    const { controller, signal } = useAbortController();

    if (viewsData?.length === 0) {
      const getViewsTimeseriesData = async () => {
        const startDate = "2024-01-01";
        const endDate = "2024-11-01";
        const periodGroupBy = "month";
        const accessToken = localStorage.getItem("googleAccessToken") ?? "";
        const data = await getViewsTimeseries(accessToken, startDate, endDate, periodGroupBy, signal);
    
        return data.rows;
      };
      getViewsTimeseriesData()
        .then((data) => {
          setViewsData(data);
      });

      return () => {
        controller.abort();
      }
    }
  }, [viewsData, setViewsData]);

  return (
    <CheckAuth>
      <div id="Dashboard">
        <div className="dashboard-container fade-in">
          <div className="dashboard-grid-col-1">
            <Card title="Recent Subscribers" className="recent-comments-widget">
              {recentSubscribersData?.map((subscriber: any, index) => (
                <div key={index} className="subscriber">
                  <div className="subscriber-info">
                    <img src={subscriber.subscriberSnippet.thumbnails.default.url} alt="Subscriber Thumbnail" />
                    <p>{subscriber.subscriberSnippet.title}</p>
                    <p className="subscribe-date">{format(subscriber.snippet.publishedAt, "dd/MM/yyy")}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
          <div className="dashboard-grid-col-2">
            <Card title="Likes/Dislikes" className="likes-dislikes-widget">
              <PieChart 
                chartData={likesDislikesData} 
                total={likesDislikesData?.length}
              />
            </Card>
            <Card title="Audience Demographics" className="audience-widget">
              <PieChart 
                chartData={audienceDemographicsData} 
                total={audienceDemographicsData?.length}
              />
            </Card>
            <Card title="Total Views" className="total-views-widget">
              <p>Per Month</p>
              <LineChart 
                chartData={viewsData} 
                total={viewsData?.length}
              />
            </Card>
          </div>
        </div>
      </div>
    </CheckAuth>
  );
}
