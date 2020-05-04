import axios from 'axios';

const SALER_API_BASE_URL = "http://localhost:8080/suser";

class ApiService {
    fetchUserList() {
        return axios.get("http://localhost:8080/suser");
    }
    fetchUserByID(su_id) {
        return axios.get("http://localhost:8080/suser/" + su_id);
    }
    deleteUser(su_id) {
        return axios.delete("http://localhost:8080/suser/"+su_id);
    }
    insertUser(user) {
        return axios.post("http://localhost:8080/suser", user);
    }
    updateUser(user) {
        return axios.put("http://localhost:8080/suser/" + user.su_id, user);
    }
}
export default new ApiService();