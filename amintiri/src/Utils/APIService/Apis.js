import axios from "axios";

const baseUrl = "http://ec2-15-207-138-177.ap-south-1.compute.amazonaws.com:8080";
const username = "admin";
const password = "admin123";

// Encode credentials for Basic Auth
const basicAuth = "Basic " + btoa(`${username}:${password}`);

class Apis {
  getStores() {
    return axios.get(baseUrl + "/api/stores", {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }

  createUser(userData) {
    return axios.post(baseUrl + "/api/users", userData, {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }

  loginUser(loginData) {
    return axios.post(baseUrl + "/api/users/login", loginData, {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }
}

const apisInstance = new Apis();
export default apisInstance;
