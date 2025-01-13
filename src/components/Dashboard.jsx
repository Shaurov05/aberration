import React, { useEffect, useState } from "react";
import { fetchDealerships } from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dealerships, setDealerships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("called once");
    setIsLoading(true);
    const getDealerships = async () => {
      const data = await fetchDealerships();
      setDealerships(data);
      setIsLoading(false);
    };
    getDealerships();
  }, []);

  const filteredDealerships = dealerships.filter((dealership) =>
    dealership.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchDealerShips = async () => {
    setIsLoading(true);
    setSearchTerm("");
    const data = await fetchDealerships(searchTerm);
    setDealerships(data);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
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

        <div className="h-[90%] overflow-y-auto mt-4">
          {isLoading ? (
            <div className="flex h-[70%] w-full items-center justify-center">
              <div
                className="spinner-border secondary w-[150px] h-[150px] text-[#4e54c8]"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-8 justify-between">
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
                      {dealership?.name}
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
                        Inventory Count: {dealership?.inventory_count}
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
                        MTD Sold: {dealership?.month_to_date_sold_count}
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
                        New Additions: {dealership.new_additions_count}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
