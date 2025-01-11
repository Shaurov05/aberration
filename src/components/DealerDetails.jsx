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
        return <div></div>;
    }
  };

  return getDealershipDetailsComponent();
};

export default DealerDetails;
