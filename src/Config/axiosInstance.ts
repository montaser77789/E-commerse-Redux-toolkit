import axios from "axios"

const axioInstance = axios.create({
    baseURL: "https://ecommerce-backend-377z.onrender.com/api",
    timeout: 3000,
  });
  export default axioInstance ;