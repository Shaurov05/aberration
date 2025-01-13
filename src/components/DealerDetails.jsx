import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import DealerData from "./DealerData";

const DealerDetails = () => {
  let { tabName } = useParams();
  const location = useLocation();
  const [dealerName, setDealerName] = useState("");

  useEffect(() => {
    if (location.state?.dealership) {
      setDealerName(location.state.dealership?.name);
    }
  }, [location.state]);

  const getDealershipDetailsComponent = () => {
    switch (tabName) {
      case "inventory":
      case "sold":
      case "added":
        return <DealerData tabName={tabName} dealerName={dealerName} />;
      default:
        return (
          <div className="flex-1 bg-[#1a2a6c] text-white p-6 w-[82%]">
            <h2 className="text-2xl font-bold w-full">
              Report of: {dealerName}
            </h2>
            <p className="text-2xl font-bold">Coming soon...</p>
          </div>
        );
    }
  };

  return getDealershipDetailsComponent();
};

export default DealerDetails;
