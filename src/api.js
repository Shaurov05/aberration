import axios from "axios";
import { getAccessToken } from "./utils";

const API_BASE_URL = "http://aberrationauto.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (!error.config._retry) {
        error.config._retry = true;
        const refreshed = await refreshToken();

        if (refreshed) {
          error.config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
          return axiosInstance.request(error.config);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    let data = response.data;
    if (data.access) {
      localStorage.setItem("accessToken", data.access);
      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/login/`, {
      email: email,
      password: password,
    });
    let data = response.data;
    if (data.access && data.refresh) {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      return true;
    }
    throw new Error("Login failed. Please try again.");
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed.");
    } else {
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const fetchDealerships = async (page = 1, query = "") => {
  try {
    console.log("dealer list: ", getAccessToken());
    const response = await axiosInstance.get(
      `${API_BASE_URL}/api/dealerships/?page=${page}&query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
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
    endDate,
    getAccessToken()
  );
  let pageSuffix = "";
  if (tabName === "inventory") {
    pageSuffix = "api/vehicles";
  } else if (tabName === "sold") {
    pageSuffix = "api/sold-vehicles";
  } else if (tabName === "added") {
    pageSuffix = "api/added-vehicles";
  }

  try {
    const response = await axiosInstance(
      `${API_BASE_URL}/${pageSuffix}?dealership_id=${dealerId}&start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    console.log("response: ", response.data);

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

    if (response.status !== 200) {
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

export const fetchUserList = async (query, dummyData = true) => {
  console.log("user list api called");
  if (dummyData) {
    return {
      success: true,
      data: [
        {
          id: 1,
          name: "Stephanie Johnson",
          email: "stephanie.j@example.com",
          role: "admin",
          status: "active",
          phone: "1234567890",
        },
        {
          id: 2,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 4,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 5,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 6,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 7,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 8,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 9,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 10,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 11,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 12,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 13,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
          phone: "1234567890",
        },
        {
          id: 14,
          name: "Michael Brown",
          email: "michael.b@example.com",
          role: "user",
          status: "inactive",
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
  try {
    const response = await axios.post(`${API_BASE_URL}/api/add-user/`, {
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
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/update-user/userId/`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        status: user.status,
        phone: user.phone,
      }
    );
    return response.data;
  } catch (error) {
    console.error("failed to create user:", error);
    return [];
  }
};

export const deleteUser = async (userId) => {
  console.log("delete user api called. userId: ", userId);
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/delete-user/userId`
    );
    return response.data;
  } catch (error) {
    console.error("failed to delete user:", error);
    return false;
  }
};
