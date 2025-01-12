import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { isUserAuthenticated } from "../utils";
import { createUser, updateUser } from "../api";

const UserForm = () => {
  const { operation, userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
    role: "",
    status: "",
    phone: "",
  });

  useEffect(() => {
    if (location.state?.user) {
      setSelectedUser(location.state.user);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data:", selectedUser);
    if (!["add", "update"].includes(operation)) {
      alert("Invalid operation");
      return;
    }

    if (!selectedUser.email || !selectedUser.confirm_email) {
      alert("Email and confirm email cannot be empty.");
      return;
    } else if (selectedUser.email !== selectedUser.confirm_email) {
      alert("Email and confirm email do not match.");
      return;
    } else if (!selectedUser.password || !selectedUser.confirm_password) {
      alert("Password and confirm password field cannot be empty.");
      return;
    } else if (selectedUser.password !== selectedUser.confirm_password) {
      alert("Password and confirm password do not match.");
      return;
    }

    if (operation === "add") {
      const data = await createUser(selectedUser);
      if (!data.success) {
        alert(data.error || "Failed to create user.");
        return;
      }
    } else {
      const data = await updateUser(userId, selectedUser);
      if (!data.success) {
        alert(data.error || "Failed to update user.");
        return;
      }
    }

    navigate("/user-management");
  };

  console.log("selectedUser?.role: ", selectedUser?.role);

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex justify-center items-center h-full w-full">
        <div
          className="w-[30%] bg-[#333333] rounded-3xl p-6 text-white"
          style={{ fontFamily: "Roboto" }}
        >
          <div className="flex justify-center h-9">
            <p className="text-lg capitalize">{`${operation} User`}</p>
          </div>
          <Form className="text-sm" onSubmit={handleSubmit}>
            <fieldset>
              <Form.Group className="mb-2">
                <Form.Label
                  htmlFor="full_name"
                  className="leading-7 text-sm mb-0"
                >
                  Full Name
                </Form.Label>
                <Form.Control
                  id="full_name"
                  placeholder="Enter full name"
                  name="name"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  value={selectedUser?.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="email" className="leading-7 text-sm mb-0">
                  Email Address
                </Form.Label>
                <Form.Control
                  id="email"
                  placeholder="Enter email address"
                  name="email"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  value={selectedUser?.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label
                  htmlFor="confirm_email"
                  className="leading-7 text-sm mb-0"
                >
                  Confirm Email Address
                </Form.Label>
                <Form.Control
                  id="confirm_email"
                  placeholder="Confirm email address"
                  name="confirm_email"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label
                  htmlFor="password"
                  className="leading-7 text-sm mb-0"
                >
                  Password
                </Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label
                  htmlFor="confirm_password"
                  className="leading-7 text-sm"
                >
                  Confirm Password
                </Form.Label>
                <Form.Control
                  id="confirm_password"
                  placeholder="Confirm password"
                  type="password"
                  name="confirm_password"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="role" className="leading-7 text-sm mb-0">
                  Role
                </Form.Label>
                <Form.Select
                  id="role"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  onChange={handleChange}
                  name="role"
                  value={selectedUser?.role}
                >
                  <option value={"admin"}>Admin</option>
                  <option value={"user"}>User</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="status" className="leading-7 text-sm mb-0">
                  Active Status
                </Form.Label>
                <Form.Select
                  id="status"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  onChange={handleChange}
                  name="status"
                  value={selectedUser?.status}
                >
                  <option value={"active"}>Active</option>
                  <option value={"inactive"}>Inactive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="phone" className="leading-7 text-sm mb-0">
                  Phone Number
                </Form.Label>
                <Form.Control
                  id="phone"
                  placeholder="Enter phone number"
                  className="rounded-3xl text-sm text-[#94a3b8]"
                  value={selectedUser?.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="flex justify-between gap-3 mt-4">
                <Button
                  className="flex-1 rounded-3xl text-sm bg-[#4e54c8] h-9"
                  type="submit"
                >
                  {operation === "update" ? "Save" : "Add"} User
                </Button>
                <Button
                  className="flex-1 rounded-3xl text-sm bg-white text-black h-9"
                  onClick={() => {
                    if (isUserAuthenticated()) {
                      navigate("/user-management");
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  Cancel
                </Button>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
