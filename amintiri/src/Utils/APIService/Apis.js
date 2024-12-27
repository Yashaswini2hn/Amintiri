// import axios from "axios";

// const baseUrl = "http://ec2-15-207-138-177.ap-south-1.compute.amazonaws.com:8080";
// const username = "admin";
// const password = "admin123";


// const basicAuth = "Basic " + btoa(`${username}:${password}`);

// const userId = localStorage.getItem("userid")
// const apiToken = localStorage.getItem("token")

// console.log("userId .... " , userId)
// console.log("apiToken .... " , apiToken)


// class Apis {
//   

//  

//  

//   



//   batchOrders(orderIds) {
//     return axios.post(
//       `${baseUrl}/batch/batch-orders?userid=${userId}&authtoken=${apiToken}`,
//       orderIds, 
//       {
//         headers: {
//           Authorization: basicAuth,
//           Accept: "*/*",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }

// }

// const apisInstance = new Apis();
// export default apisInstance;


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

// Add an interceptor to include userId and apiToken dynamically
axiosInstance.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userid");
  const apiToken = localStorage.getItem("token");

  // Include userId and apiToken in query params or headers
  if (userId && apiToken) {
    config.params = {
      ...config.params,
      userid: userId,
      authtoken: apiToken,
    };
  }
  return config;
});

class Apis {


  createUser(name, mobile, email, role, password) {
    return axios.post(baseUrl + `/api/users?name=${name}&mobile=${mobile}&email=${email}&role=${role}&password=${password}`);
  }

  loginUser(email, password) {
    return axios.post(baseUrl + `/api/users/login?emailormobile=${email}&password=${password}`);
  }

  getStores() {
    return axiosInstance.get("/api/stores");
  }

  getCustomers() {
    return axiosInstance.get(`/api/customers`);
  }

  getOrders(customerId) {
    return axiosInstance.get(`/api/customers/${customerId}/orders`);
  }

  getBatches() {
    return axiosInstance.get(`/batch`);
  }

  // getOrdersByStatus(status) {
  //   return axiosInstance.get("/api/orders", {
  //     params: { status }, // Include the status dynamically
  //   });
  // }

  getAllOrders(filters) {
    return axiosInstance.get("/api/orders", {
      params: { ...filters }, // Spread the filters object into query parameters
    });
  
  }


//   batchOrders(orderIds) {
//     return axios.post(
//       `${baseUrl}/batch/batch-orders?userid=${userId}&authtoken=${apiToken}`,
//       orderIds, 
//       {
//         headers: {
//           Authorization: basicAuth,
//           Accept: "*/*",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }

//   getStations(userId, token) {
//     return axios.get(`${baseUrl}/api/station?userid=${userId}&authtoken=${apiToken}`, {
//       headers: {
//         Authorization: basicAuth,
//         Accept: '*/*',
//         'Content-Type': 'application/json',
//       },
//     });
//   }
  
//   unbatch(batchIds) {
//     const userId = localStorage.getItem('userid');
//     const apiToken = localStorage.getItem('token');
  
//     return axios.post(
//       `${baseUrl}/batch/unbatch?userid=${userId}&authtoken=${apiToken}`,
//       { batchIds },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: basicAuth,
//         },
//       }
//     );
//   }

//   searchCustomers(query) {
//     return axios.get(`${baseUrl}/api/customers/search?userid=${userId}&authtoken=${apiToken}&query=${query}`, {
//       headers: {
//         Authorization: basicAuth,
//         Accept: "*/*",
//         "Content-Type": "application/json",
//       },
//     });
// }

  
  
}

export default new Apis();

