import axios from "axios"

const axioInstance = axios.create({
    baseURL: "https://ecommerce-backend-377z.onrender.com/api",
    timeout: 10000,
  });
  export default axioInstance ;