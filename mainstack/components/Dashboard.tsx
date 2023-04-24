import React from "react";
import Image from "next/image";

//sidebar elements in arrays to enable mapping function in JSX
const sidebar = [
  {
    title: "Dashboard",
    logoUrl: "/images/dashboard.jpg",
    subContents: [
      { title: "item 1", logoUrl: "/images/edit.jpg" },
      { title: "item 1", logoUrl: "/images/group.jpg" },
      { title: "item 1", logoUrl: "/images/hourglass_empty.jpg" },
    ],
  },

  {
    title: "Others 1",
    subContents: [
      { title: "item 1", logoUrl: "/images/camera.jpg" },
      { title: "item 1", logoUrl: "/images/delete.jpg" },
    ],
  },

  {
    title: "Others 2",
    subContents: [
      { title: "item 1", logoUrl: "/images/subscriptions.jpg" },
      { title: "item 1", logoUrl: "/images/file.jpg" },
      { title: "item 1", logoUrl: "/images/alarm.jpg" },
    ],
  },
];

const Dashboard = () => {
  return (
    <div>
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
                  />
                )}
                <span>{item.title}</span>

                <ul className="sidebar-list2">
                  {item.subContents.map((subContent, index) => (
                    <li key={index}>
                      <Image
                        src={subContent.logoUrl}
                        alt={`${subContent.title} Logo`}
                        width={10}
                        height={10}
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
    </div>
  );
};

export default Dashboard;
