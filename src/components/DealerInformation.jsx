import React from "react";
import SideBar from "./SideBar";
import DealerDetails from "./DealerDetails";

const DealerInformation = () => {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <DealerDetails />
    </div>
  );
};

export default DealerInformation;
