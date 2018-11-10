import Axios from "axios/index";


const axiosInstance = Axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1/',
    headers: {'Accept': 'application/json', 'user-key': '7a3aa8373836a9a0c9ed286a9f31a254'}
});


export default axiosInstance;