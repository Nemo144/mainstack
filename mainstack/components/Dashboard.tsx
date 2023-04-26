import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

//sidebar elements in arrays to enable mapping function in JSX
const sidebar = [
  {
    title: "Dashboard",
    logoUrl: "/images/dashboard.jpg",
    subContents: [
      { title: "item 1", logoUrl: "/images/edit.jpg" },
      { title: "item 2", logoUrl: "/images/group.jpg" },
      { title: "item 3", logoUrl: "/images/hourglass_empty.jpg" },
    ],
  },

  {
    title: "Others 1",
    subContents: [
      { title: "item 4", logoUrl: "/images/camera.jpg" },
      { title: "item 5", logoUrl: "/images/delete.jpg" },
    ],
  },

  {
    title: "Others 2",
    subContents: [
      { title: "item 6", logoUrl: "/images/subscriptions.jpg" },
      { title: "item 7", logoUrl: "/images/file.jpg" },
      { title: "item 8", logoUrl: "/images/alarm.jpg" },
    ],
  },
];

const days = [
  "1 Day",

  "3 Days",

  "7 Days",

  "30 Days",

  "All Time",

  "Custom Date",
];

const Dashboard = () => {
  //state to manage our the line graph data from the API
  const [graphData, setGraphData] = useState({ views: {} });

  //state to manage the doughnut-graph top-location data from the API
  const [topLocations, setTopLocations] = useState([]);

  //state to manage the doughnut-graph top-sources data from the API
  const [topSources, setTopSources] = useState([]);

  //state to show indicate the loading state of the graph
  const [isLoading, setIsLoading] = useState(true);

  //effect hook to fetch the line graph data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fe-task-api.mainstack.io/");
        const data = await response.json();
        setGraphData(data.graph_data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  //effect hook to fetch the top-location data from the API
  useEffect(() => {
    async function fetchLocationData() {
      const res = await fetch("https://fe-task-api.mainstack.io/");
      const data = await res.json();
      setTopLocations(data.top_locations);
    }
    fetchLocationData();
  }, []);

  //effect hook to fetch the top-sources data from the API
  useEffect(() => {
    async function fetchSourcesData() {
      const res = await fetch("https://fe-task-api.mainstack.io/");
      const data = await res.json();
      setTopSources(data.top_sources);
    }
    fetchSourcesData();
  }, []);

  //chart data for our line graph
  const chartData = {
    labels: Object.keys(graphData.views),
    datasets: [
      {
        label: "Views",
        data: Object.values(graphData.views),
        fill: true,
        borderColor: "#FF5403",
        background:
          "linear-gradient(180deg, rgba(247, 245, 244, 0.2) 0%, rgba(255, 84, 3, 0) 100%);",

        tension: 0.1,
      },
    ],
  };

  //chart data for our top-location doughnut graph
  const chartLocationsData = {
    labels: topLocations?.map((loc: { country: any }) => loc.country) || [],
    datasets: [
      {
        data: topLocations?.map((loc: { count: any }) => loc.count) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  //chart data for our top-sources doughnut graph
  const chartSourcesData = {
    labels: topSources.map((source: { source: any }) => source.source),
    datasets: [
      {
        data: topSources.map((source: { count: any }) => source.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#1abc9c"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#1abc9c"],
      },
    ],
  };

  //chart options for our line graph
  const chartOptions = {
    scales: {
      x: {
        type: "time",
        adapters: {
          date: {
            locale: enUS,
          },
        },
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM d",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Views",
        },
      },
    },
  };

  //chart options for our top-locations doughnut graph
  const chartLocationsOptions = {
    plugins: {
      legend: {
        position: "left",
      },
    },
  };

  //chart options for our top-sources doughnut graph
  const chartSourcesOptions = {
    plugins: {
      legend: {
        position: "left",
      },
    },
  };

  return (
    <div>
      <div className="layout">
        <div className="logo-sidebar">
          <div>
            <Image
              priority
              src="/images/mainstack-logo.jpg"
              alt="mainstack-logo"
              width={30}
              height={30}
              className="logo"
            />
          </div>

          <div>
            <ul className="sidebar-list1">
              {sidebar.map((item, index) => (
                <li key={index}>
                  {/*render image if the logoUrl exists*/}
                  {item.logoUrl && (
                    <Image
                      priority
                      src={item.logoUrl!}
                      alt={`${item.title} Logo`}
                      width={10}
                      height={10}
                      className="image-title"
                    />
                  )}
                  <span className={index === 0 ? "firstTitle" : ""}>
                    {item.title}
                  </span>

                  <ul className="sidebar-list2">
                    {item.subContents.map((subContent, index) => (
                      <li className="subContent" key={index}>
                        <Image
                          src={subContent.logoUrl}
                          alt={`${subContent.title} Logo`}
                          width={10}
                          height={10}
                          className="image-title"
                        />
                        <span>{subContent.title}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="sidebar-owner">
              <Image
                priority
                src={"/images/image.jpg"}
                alt="blessing"
                width={20}
                height={20}
              />
              <h6 className="owner-name">Blessing Daniels</h6>
              <p className="owner-horiz">...</p>
            </div>
          </div>
        </div>

        <div className="nav">
          <h2>Dashboard</h2>

          <div className="dashboard-headers">
            <div className="headers">
              <h1>Good Morning, Blessing 🌤</h1>
              <p className="headers-word">Check out your dashboard summary.</p>
            </div>

            <div className="headers-analytics">
              <p className="word-analytics">view analytics</p>
            </div>
          </div>

          <ul className="days">
            {days.map((day, index) => (
              <li className="days-list" key={index}>
                <span className={index === 4 ? "fourthTitle" : ""}>{day}</span>
              </li>
            ))}
          </ul>

          <div className="line-graph">
            <h1 className="line-word">Page Views</h1>
            <div className="line-img">
              <Image
                src={"/images/info.jpg"}
                alt="info"
                width={10}
                height={10}
              />
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p className="line-paragraph">All time</p>
                <h1 className="line-num">500</h1>
                <div className="line-fill">
                  <Line
                    data={chartData}
                    options={chartOptions}
                    key={JSON.stringify(graphData.views)}
                    className="line-data"
                  />
                </div>
              </>
            )}
          </div>

          <div className="graph-container">
            <div className="doughnut-graph1">
              <div className="graph1">
                <h1 className="graph1-text">Top Locations</h1>
                <p className="graph1-p">View full reports</p>
              </div>
              <Doughnut
                options={chartLocationsOptions}
                data={chartLocationsData}
                className="dough"
              />
            </div>

            <div className="doughnut-graph2">
              <div className="graph1">
                <h1 className="graph1-text">Top Referral Sources</h1>
                <p className="graph1-p">View full reports</p>
              </div>
              <Doughnut
                options={chartSourcesOptions}
                data={chartSourcesData}
                className="dough"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
