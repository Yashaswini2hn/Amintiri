import axios from "axios";

const baseUrl = "http://ec2-15-207-138-177.ap-south-1.compute.amazonaws.com:8080";
const username = "admin";
const password = "admin123";
const basicAuth = "Basic " + btoa(`${username}:${password}`);

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: basicAuth,
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include userId and apiToken dynamically in the headers
axiosInstance.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userid");
  const apiToken = localStorage.getItem("token");

  // Include userId and apiToken in headers
  if (userId && apiToken) {
    config.headers = {
      ...config.headers,
      "userid": userId,
      "authtoken": apiToken,
    };
  }
  return config;
});

class Apis {
  createUser(name, mobile, email, role, password) {
    return axiosInstance.post(`/api/users`, null, {
      params: { name, mobile, email, role, password },
    });
  }

  loginUser(email, password) {
    return axiosInstance.post(`/api/users/login`, null, {
      params: { emailormobile: email, password },
    });
  }

  getStores() {
    return axiosInstance.get("/api/stores");
  }

  getOrdersByDate(orderdate, page = 0, size = 10) {
    return axiosInstance.get(`/api/orders`, {
      params: { orderdate, page, size }, 
    });
  }
  getCustomers(page = 0, size = 10) {
    return axiosInstance.get(`/api/customers`, {
      params: { page, size },
    });
  }
  getOrders(customerId) {
    return axiosInstance.get(`/api/customers/${customerId}/orders`);
  }

  getBatches() {
    return axiosInstance.get(`/batch`);
  }

  getAllOrders(filters) {
    return axiosInstance.get("/api/orders", {
      params: { ...filters },
    });
  }

  batchOrders(orderIds) {
    return axiosInstance.post(`/batch/batch-orders`, orderIds);
  }

  getBatchesByDate(date) {
    return axiosInstance.get(`/batch`, {
      params: { date },
    });
  }

  getStations() {
    return axiosInstance.get(`/api/station`);
  }

  getBatchesByStation(stationId) {
    return axiosInstance.get(`/batch`, {
      params: { stationId },
    });
  }

  searchOrdersByOrderName(ordername) {
    return axiosInstance.get(`/api/orders?ordername=${ordername}`);
  }
  

  unbatch(orderItemIds) {
    return axiosInstance.post(`/batch/unbatch`, orderItemIds);
  }

  searchCustomers(query) {
    return axiosInstance.get(`/api/customers/search`, {
      params: { query },
    });
  }
}

export default new Apis();
