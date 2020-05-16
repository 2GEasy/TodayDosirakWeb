import axios from 'axios';

// const USER_API_BASE_URL = "http://localhost:8080/users";
const NOTICE_API_BASE_URL = "http://localhost:8080/notice";

class ApiService {
    fetchNotice() {
        return axios.get(NOTICE_API_BASE_URL);
    }
    fetchNoticeByID(ntcb_id) {
        return axios.get(NOTICE_API_BASE_URL + '/' + ntcb_id);
    }
    // fetchUsers () {
    //     return axios.get(USER_API_BASE_URL);
    // }
    // fetchUserByID(userID) {
    //     return axios.get(USER_API_BASE_URL + '/' + userID);
    // }
    // deleteUser(userID) {
    //     return axios.delete(USER_API_BASE_URL+'/'+userID);
    // }
    // addUser(user) {
    //     return axios.post(USER_API_BASE_URL, user);
    // }
    // editUser(user) {
    //     return axios.put(USER_API_BASE_URL + '/' + user.id,user);
    // }
}
export default new ApiService();