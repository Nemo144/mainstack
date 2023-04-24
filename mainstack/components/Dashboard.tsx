import React from "react";
import Image from "next/image";

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

        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
