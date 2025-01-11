import React, { useState } from "react";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-[10%] p-6 flex">
        <div className="flex flex-1 items-center">
          <p
            style={{ fontFamily: "Open Sans" }}
            className="text-white text-3xl leading-[48px] font-medium"
          >
            User Management
          </p>
        </div>
        <div className="flex flex-1 items-center justify-end gap-6">
          <div>
            <input
              type="text"
              placeholder="Search by name, email, role"
              className="bg-white h-9 px-2 py-2 text-sm rounded-3xl w-[300px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-[#4e54c8] h-9 w-24 rounded-3xl text-white text-base leading-5"
              onClick={() => {
                navigate("/users/add");
              }}
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      <UserList searchTerm={searchTerm} />
    </div>
  );
};

export default UserManagement;
