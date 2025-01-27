import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteUser, fetchUserList } from "../api";
import { useNavigate } from "react-router-dom";

const UserList = ({ searchTerm = "" }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.role?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const getUsers = async () => {
    const data = await fetchUserList();
    if (data) {
      setUsers(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    const response = await deleteUser(selectedUser.id);
    if (response) {
      setShowPopup(false);
      setSelectedUser(null);
      await getUsers();
    }
    setIsLoading(false);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  const handleSelect = (eventKey) => {
    setEntriesPerPage(parseInt(eventKey));
  };

  return (
    <div className="h-[90%] bg-[#1a2a6c] text-white font-sans px-6">
      <div className="flex justify-between items-center mb-4 h-16">
        <p style={{ fontFamily: "Open Sans" }} className="text-lg">
          Show entries:
        </p>

        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle
            id="dropdown-basic"
            className="bg-white !text-[#94a3b8] shadow-md rounded-3xl w-16"
          >
            {entriesPerPage}
          </Dropdown.Toggle>

          <Dropdown.Menu className="min-w-16 relative">
            <Dropdown.Item eventKey="5">5</Dropdown.Item>
            <Dropdown.Item eventKey="10">10</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
            <Dropdown.Item eventKey="50">50</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

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
        <div className="overflow-auto max-h-[500px]">
          <table className="min-w-full bg-white rounded-lg text-black shadow-md">
            <thead className="sticky top-0 bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Email Address</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Account Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.slice(0, entriesPerPage).map((user, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2">{user?.name}</td>
                  <td className="px-4 py-2">
                    <a
                      href={`mailto:${user?.email}`}
                      className="text-blue-600 underline"
                    >
                      {user?.email}
                    </a>
                  </td>
                  <td className="px-4 py-2 capitalize">{user?.role}</td>
                  <td className="px-4 py-2 capitalize">{user?.status}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      style={{ fontFamily: "Open Sans" }}
                      onClick={() =>
                        navigate(`/users/update/${user?.id}`, {
                          state: { user },
                        })
                      }
                      className="px-4 py-2 bg-[#1a2a6c] w-20 text-white text-sm rounded-3xl hover:bg-[#283e9a]"
                    >
                      Edit
                    </button>
                    <button
                      style={{ fontFamily: "Open Sans" }}
                      onClick={() => handleDeleteClick(user)}
                      className="px-4 py-2 bg-[#4e54c8] w-20 text-white text-sm rounded-3xl hover:bg-[#5d63ce] "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4 text-black">
                Confirm Deletion
              </h2>
              <p className="mb-6 text-black">
                Are you sure you want to delete{" "}
                <span className="font-bold">{selectedUser?.name}</span>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
