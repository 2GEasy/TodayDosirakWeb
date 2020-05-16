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
    fetchHygiene(su_id) {
        return axios.get("http://localhost:8080/hygiene/"+su_id);
    }
    fetchHygieneByID(su_id,hgn_id) {
        return axios.get("http://localhost:8080/hygiene/"+su_id+"/"+hgn_id);
    }
    insertHygiene(hygiene) {
        return axios.post("http://localhost:8080/hygiene", hygiene);
    }
    insertHygieneImg(file,su_id) {
        return axios.post("http://localhost:8080/hygieneImg/"+su_id, file);
    }
    fetchHygieneImgPreview(su_id,hgn_id) {
        return axios.get("http://localhost:8080/hygieneImg/"+su_id+"/"+hgn_id);
    }
    deleteHygieneInfo(su_id,hgn_id) {
        return axios.delete("http://localhost:8080/hygiene/"+su_id+"/"+hgn_id);
    }
    modifyHygieneInfo(hygiene) {
        return axios.put("http://localhost:8080/hygiene",hygiene);
    }
    updateHygieneImg(formData,su_id,hgn_id) {
        return axios.put("http://localhost:8080/hygieneImg/"+su_id+"/"+hgn_id,formData);
    }

    fetchMenuList(su_id) {
        return axios.get("http://localhost:8080/menu/"+su_id);
    }
    fetchMenuByID(su_id,mn_id) {
        return axios.get("http://localhost:8080/menu/"+su_id+"/"+mn_id);
    }
    insertMenu(menu) {
        return axios.post("http://localhost:8080/menu", menu);
    }
    insertMenuImg(file,su_id) {
        return axios.post("http://localhost:8080/menuImg/"+su_id, file);
    }
    fetchMenuImgPreview(su_id,mn_id) {
        return axios.get("http://localhost:8080/menuImg/"+su_id+"/"+mn_id);
    }
    deleteMenu(su_id,mn_id) {
        return axios.delete("http://localhost:8080/menu/"+su_id+"/"+mn_id);
    }
    modifyMenu(menu) {
        return axios.put("http://localhost:8080/menu",menu);
    }
    updateMenuImg(formData,su_id,mn_id) {
        return axios.put("http://localhost:8080/menuImg/"+su_id+"/"+mn_id,formData);
    }

    fetchStockList(su_id) {
        return axios.get("http://localhost:8080/stock/"+su_id);
    }
    fetchStockByID(su_id,stck_id) {
        return axios.get("http://localhost:8080/stock/"+su_id+"/"+stck_id);
    }
    insertStock(stock) {
        return axios.post("http://localhost:8080/stock", stock);
    }
    insertStockImg(file,su_id) {
        return axios.post("http://localhost:8080/stockImg/"+su_id, file);
    }
    fetchStockImgPreview(su_id,stck_id) {
        return axios.get("http://localhost:8080/stockImg/"+su_id+"/"+stck_id);
    }
    deleteStock(su_id,stck_id) {
        return axios.delete("http://localhost:8080/stock/"+su_id+"/"+stck_id);
    }
    modifyStock(stock) {
        return axios.put("http://localhost:8080/stock",stock);
    }
    updateStockImg(formData,su_id,stck_id) {
        return axios.put("http://localhost:8080/stockImg/"+su_id+"/"+stck_id,formData);
    }

    fetchOpenList(su_id) {
        return axios.get("http://localhost:8080/storeOpen/"+su_id);
    }

    fetchOpenState(su_id) {
        return axios.get("http://localhost:8080/storeOpen/state/"+su_id);
    }
    updateOpenState(open_id,su_id) {
        return axios.put("http://localhost:8080/storeOpen/"+su_id+"/"+open_id);
    }
    insertOpenState(su_id) {
        return axios.post("http://localhost:8080/storeOpen/"+su_id);
    }
}
export default new ApiService();