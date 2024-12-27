import axios from "axios";

const baseUrl = "http://ec2-15-207-138-177.ap-south-1.compute.amazonaws.com:8080";
const username = "admin";
const password = "admin123";


const basicAuth = "Basic " + btoa(`${username}:${password}`);

const userId = localStorage.getItem("userid")
const apiToken = localStorage.getItem("token")


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

  createUser(name,mobile,email,role,password) {
    return axios.post(baseUrl + `/api/users?name=${name}&mobile=${mobile}&email=${email}&role=${role}&password=${password}`, {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }

  loginUser(email,password) {
    return axios.post(baseUrl + `/api/users/login?emailormobile=${email}&password=${password}`,{
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }

  getAllOrders(userid,usersecret) {
    return axios.get(baseUrl + `/api/orders?userid=${userId}&authtoken=${apiToken}`,{
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }
 
  getCustomers() {
    return axios.get(
      baseUrl +
        `/api/customers?userid=${userId}&authtoken=${apiToken}`,
      {
        headers: {
          Authorization: basicAuth,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
  }

  getOrders(customerId) {
    return axios.get(
      `${baseUrl}/api/customers/${customerId}/orders?userid=${userId}&authtoken=${apiToken}`,
      {
        headers: {
          Authorization: basicAuth,
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getBatches() {
    const userId = localStorage.getItem("userid");
    const apiToken = localStorage.getItem("token");
  
    if (!userId || !apiToken) {
      console.error("UserID or AuthToken is missing");
      return Promise.reject("Missing UserID or AuthToken");
    }
  
    return axios.get(
      `${baseUrl}/batch?userid=${userId}&authtoken=${apiToken}`,
      {
        headers: {
          Authorization: basicAuth,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
  } 

  getOrdersByStatus(status) {
    const query = `status=${status}&userid=${userId}&authtoken=${apiToken}`;
    return axios.get(`${baseUrl}/api/orders?${query}`, {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }

  getOrdersByDate(date) {
    const query = `date=${date}&userid=${userId}&authtoken=${apiToken}`;
    return axios.get(`${baseUrl}/api/orders?${query}`, {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }

  getOrdersByDeliveryTime(startTime, endTime) {
    const query = `deliveryTimeStart=${startTime}&deliveryTimeEnd=${endTime}&userid=${userId}&authtoken=${apiToken}`;
    return axios.get(`${baseUrl}/api/orders?${query}`, {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }
  
  fetchOrdersBySelectedStatusAPI(status) {
    const query = `status=${status}&userid=${userId}&authtoken=${apiToken}`;
    return axios.get(`${baseUrl}/api/orders?${query}`, {
      headers: {
        Authorization: basicAuth,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }  

  batchOrders(orderIds) {
    return axios.post(
      `${baseUrl}/batch/batch-orders?userid=${userId}&authtoken=${apiToken}`,
      orderIds, 
      {
        headers: {
          Authorization: basicAuth,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
  }

  getStations(userId, token) {
    return axios.get(`${baseUrl}/api/station?userid=${userId}&authtoken=${apiToken}`, {
      headers: {
        Authorization: basicAuth,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  }
  
  unbatch(batchIds) {
    const userId = localStorage.getItem('userid');
    const apiToken = localStorage.getItem('token');
  
    return axios.post(
      `${baseUrl}/batch/unbatch?userid=${userId}&authtoken=${apiToken}`,
      { batchIds },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: basicAuth,
        },
      }
    );
  }

  searchCustomers(query) {
    return axios.get(`${baseUrl}/api/customers/search?userid=${userId}&authtoken=${apiToken}&query=${query}`, {
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
