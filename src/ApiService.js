import axios from 'axios';

const SALER_API_BASE_URL = "http://localhost:8080/suser";

class ApiService {
    fetchUserList() {
        return axios.get("http://localhost:8080/suser");
    }
    fetchUserByID(su_id) {
        console.log(su_id);
        console.log(axios.get("http://localhost:8080/suser/"+ su_id));
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
    loginUser(su_id,pw) {
        return axios.get("http://localhost:8080/suser/"+su_id+"/"+pw)
    }

    insertStoreInf(store) {
        return axios.post("http://localhost:8080/store", store);
    }
    insertStoreImg(file,su_id) {
        return axios.post("http://localhost:8080/storeImg/"+su_id, file);
    }
    fetchStoreByID(su_id) {
        return axios.get("http://localhost:8080/store/" + su_id);
    }
    fetchStoreImgByID(su_id) {
        return axios.get("http://localhost:8080/storeImg/" + su_id);
    }
    updateStoreInf(store) {
        return axios.put("http://localhost:8080/store/" + store.su_id, store);
    }
    updateStoreImg(file,su_id) {
        return axios.put("http://localhost:8080/storeImg/" + su_id, file);
    }
}
export default new ApiService();