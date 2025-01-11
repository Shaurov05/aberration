import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  let { dealerId, tabName } = useParams();

  const handleTabChange = (tabName) => {
    navigate(`/dealership/${dealerId}/${tabName}`);
  };

  return (
    <div className="bg-[#333333] text-white flex flex-col w-[18%] h-full">
      <nav className="flex flex-col mt-4 space-y-4 px-4">
        <button
          className="flex justify-center items-center h-9 text-sm bg-[#4e54c8] rounded-3xl hover:bg-[#7f83da]"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            handleTabChange("inventory");
          }}
          value={"inventory"}
          className={`flex justify-center items-center h-9 text-sm text-left px-4 py-2 rounded-3xl ${
            tabName === "inventory"
              ? " bg-[#1a2a6c] hover:bg-[#293e93]"
              : "bg-white hover:bg-indigo-100 text-[#1a2a6c]"
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => {
            handleTabChange("sold");
          }}
          value={"sold"}
          className={`flex justify-center items-center h-9 text-sm text-left px-4 py-2 rounded-3xl ${
            tabName === "sold"
              ? " bg-[#1a2a6c] hover:bg-[#293e93]"
              : "bg-white hover:bg-indigo-100 text-[#1a2a6c]"
          }`}
        >
          Sold
        </button>
        <button
          onClick={() => {
            handleTabChange("added");
          }}
          value={"added"}
          className={`flex justify-center items-center h-9 text-sm text-left px-4 py-2 rounded-3xl ${
            tabName === "added"
              ? " bg-[#1a2a6c] hover:bg-[#293e93]"
              : "bg-white hover:bg-indigo-100 text-[#1a2a6c]"
          }`}
        >
          Added
        </button>
        <button
          onClick={() => {
            handleTabChange("visualize");
          }}
          value={"visualize"}
          className={`flex justify-center items-center h-9 text-sm text-left px-4 py-2 rounded-3xl ${
            tabName === "visualize"
              ? " bg-[#1a2a6c] hover:bg-[#293e93]"
              : "bg-white hover:bg-indigo-100 text-[#1a2a6c]"
          }`}
        >
          Visualize
        </button>
      </nav>
    </div>
  );
}

export default SideBar;
