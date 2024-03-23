import axios from "axios"

const axioInstance = axios.create({
    baseURL: "https://strapi-e-commerse.onrender.com/api",
    timeout: 3000,
  });
  export default axioInstance ;