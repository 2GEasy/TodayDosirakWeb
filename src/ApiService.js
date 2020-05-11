import axios from 'axios';
import upload from './upload';

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
    insertStoreImg(data) {
        upload("/upload",req,res,function(err) {
            if(err instanceof multer.MulterError) {
                return next(err);
            }else if(err) {
                return next(err);
            }
            console.log("원본 파일명: "+req.file.originalname);
            console.log("저장 파일명: "+req.file.filename);
            console.log("크기: "+req.file.size);
    
            return res.json({success:1});
        });
        return axios.post("http://localhost:8080/storeImg", data);
    }
}
export default new ApiService();