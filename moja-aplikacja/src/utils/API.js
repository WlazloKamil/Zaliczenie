import axios from "axios";


export default axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/",
  baseURL: "http://localhost:4000/",
  responseType: "json",
  headers: {
    'Authorization': localStorage.getItem('token')
  }
});
