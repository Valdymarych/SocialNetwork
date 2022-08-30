import axios from "axios";

class API {
  async get(page,pageSize){
    return await axios.get(`/api/users?pageIndex=${page}&pageSize=${pageSize}`);
  }
  
  async post(user){
    return await axios.post("/api/user/reg",user);
  }
}

export default API;