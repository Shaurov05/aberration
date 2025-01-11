import axios from "axios";

// need to change the api base url
const API_BASE_URL = "https://api.example.com";

export const login = async (email, password) => {
  if (API_BASE_URL === "https://api.example.com") {
    return {
      success: true,
      token: "example_token",
    };
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed.");
    } else {
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const fetchDealerships = async (query = "") => {
  console.log("dealership list api called. query: ", query);
  if (API_BASE_URL === "https://api.example.com") {
    return {
      success: true,
      dealerships: [
        {
          id: 1,
          name: "Downey Nissan",
          inventory_count: 10,
          mtd_sold: 5,
          new_additions: 2,
        },
        {
          id: 2,
          name: "Dealership 1",
          inventory_count: 10,
          mtd_sold: 5,
          new_additions: 2,
        },
        {
          id: 3,
          name: "Dealership 1",
          inventory_count: 10,
          mtd_sold: 5,
          new_additions: 2,
        },
        {
          id: 4,
          name: "Dealership 1",
          inventory_count: 10,
          mtd_sold: 5,
          new_additions: 2,
        },
      ],
    };
  }

  try {
    const response = await axios(`${API_BASE_URL}/dealerships/query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dealerships:", error);
    return [];
  }
};

export const fetchDealerDetails = async (
  dealerId,
  tabName,
  startDate,
  endDate
) => {
  console.log(
    "dealer details api called: ",
    dealerId,
    tabName,
    startDate,
    endDate
  );
  if (API_BASE_URL === "https://api.example.com") {
    return {
      success: true,
      data: [
        {
          year: "2022",
          make: "Ferrari",
          model: "F8 Tributo",
          vin: "F8 Tributo",
          trim: "Base",
          color: "Red",
          mileage: "1,200",
          price: "$300,000",
          lendingValue: "$275,000",
          dateAdded: "1",
        },
        {
          year: "2021",
          make: "BMW",
          model: "7 Series",
          vin: "7 Series",
          trim: "Luxury",
          color: "Blue",
          mileage: "15,000",
          price: "$140,000",
          lendingValue: "$120,000",
          dateAdded: "2",
        },
        {
          year: "2021",
          make: "BMW",
          model: "7 Series",
          vin: "7 Series",
          trim: "Luxury",
          color: "Blue",
          mileage: "15,000",
          price: "$140,000",
          lendingValue: "$120,000",
          dateAdded: "2",
        },
        {
          year: "2021",
          make: "BMW",
          model: "7 Series",
          vin: "7 Series",
          trim: "Luxury",
          color: "Blue",
          mileage: "15,000",
          price: "$140,000",
          lendingValue: "$120,000",
          dateAdded: "2",
        },
      ],
    };
  }

  try {
    const response = await axios(
      `${API_BASE_URL}/dealers/${dealerId}/${tabName}/?start_date=${startDate}&end_date=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dealership details:", error);
    return [];
  }
};

export const handleExportDealerData = async (
  dealerId,
  tabName,
  startDate,
  endDate
) => {
  try {
    const response = await fetch(
      `https://your-api-endpoint.com/export/?dealerId=${dealerId}&tabName=${tabName}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to export the file.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${dealerId}_${tabName}_exported-file.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export failed:", error.message);
  }
};

export const fetchUserList = async (query) => {
  console.log("user list api called");
  if (API_BASE_URL === "https://api.example.com") {
    return {
      success: true,
      data: [
        {
          id: 1,
          name: "Stephanie Johnson",
          email: "stephanie.j@example.com",
          role: "Admin",
          status: "Active",
          phone: "1234567890",
        },
        {
          id: 2,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          phone: "1234567890",
        },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          phone: "1234567890",
        },
        {
          id: 4,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          phone: "1234567890",
        },
        {
          id: 5,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          phone: "1234567890",
        },
        {
          id: 6,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          phone: "1234567890",
        },
        {
          id: 7,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          phone: "1234567890",
        },
        {
          id: 8,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "User",
          status: "Inactive",
          phone: "1234567890",
        },
      ],
    };
  }

  try {
    const response = await axios(`${API_BASE_URL}/users/query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
};

export const createUser = async (user) => {
  console.log("create user api called: ", user);
  if (API_BASE_URL === "https://api.example.com") {
    return {
      success: true,
      data: {},
    };
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/create-user/`, {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      phone: user.phone,
    });
    return response.data;
  } catch (error) {
    console.error("failed to create user:", error);
    return [];
  }
};

export const updateUser = async (userId, user) => {
  console.log("update user api called. userId: ", userId, "details: ", user);
  if (API_BASE_URL === "https://api.example.com") {
    return {
      success: true,
      data: {},
    };
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/update-user/userId`, {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      phone: user.phone,
    });
    return response.data;
  } catch (error) {
    console.error("failed to create user:", error);
    return [];
  }
};

export const deleteUser = async (userId) => {
  console.log("delete user api called. userId: ", userId);
  if (API_BASE_URL === "https://api.example.com") {
    return {
      success: true,
      data: {},
    };
  }

  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-user/userId`);
    return response.data;
  } catch (error) {
    console.error("failed to delete user:", error);
    return false;
  }
};
