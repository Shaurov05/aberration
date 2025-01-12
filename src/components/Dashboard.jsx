import React, { useEffect, useState } from "react";
import { fetchDealerships } from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dealerships, setDealerships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDealerships = async () => {
      const data = await fetchDealerships();
      if (data?.success) {
        setDealerships(data?.dealerships);
      }
    };
    getDealerships();
  }, []);

  const filteredDealerships = dealerships.filter((dealership) =>
    dealership.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchDealerShips = async () => {
    setSearchTerm("");
    const data = await fetchDealerships(searchTerm);
    if (data?.success) {
      setDealerships(data?.dealerships);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full h-full p-4">
        <div className="flex w-full h-auto">
          <div className="flex-1">
            <p className="text-2xl text-white">Dealership Overview</p>
          </div>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center justify-end gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Search dealership"
                  className="bg-white h-9 px-2 py-2 text-sm rounded-3xl w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="bg-[#4e54c8] h-9 w-24 rounded-3xl text-white text-base leading-5"
                  onClick={() => searchDealerShips()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 justify-between mt-4">
          {filteredDealerships.map((dealership, index) => (
            <div
              key={index}
              className="flex flex-col bg-[#4e54c8] w-[48%] rounded-3xl p-4 gap-4"
            >
              <div className="mb-2">
                <span
                  className="text-4xl text-white cursor-pointer w-auto"
                  onClick={() => {
                    navigate(`/dealership/${dealership.id}/inventory`, {
                      state: { dealership },
                    });
                  }}
                >
                  {dealership.name}
                </span>
              </div>
              <div className="flex justify-between">
                <div
                  className="bg-[#1a2a6c] p-2 rounded-3xl w-[40%] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dealership/${dealership.id}/inventory`, {
                      state: { dealership },
                    });
                  }}
                >
                  <p className="text-white text-2xl text-center">
                    Inventory Count: {dealership.inventory_count}
                  </p>
                </div>
                <div
                  className="bg-[#1a2a6c] p-2 rounded-3xl w-[40%] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dealership/${dealership.id}/sold`, {
                      state: { dealership },
                    });
                  }}
                >
                  <p className="text-white text-2xl text-center">
                    MTD Sold: {dealership.mtd_sold}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div
                  className="bg-[#1a2a6c] p-2 rounded-3xl w-[40%] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dealership/${dealership.id}/added`, {
                      state: { dealership },
                    });
                  }}
                >
                  <p className="text-white text-2xl text-center">
                    New Additions: {dealership.new_additions}
                  </p>
                </div>
                <div
                  className="bg-[#1a2a6c] p-2 rounded-3xl w-[40%] text-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <button className="text-white text-2xl">Visualize</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
