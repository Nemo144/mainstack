import React from "react";
import Image from "next/image";

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
                <span className="day-span">{day}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
