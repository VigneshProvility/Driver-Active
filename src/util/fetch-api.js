import axios from "axios";

import {getUserCrendIntoLocalStorage} from "../services/local-storage";


function headerInfo (token) {
    const userInfo = getUserCrendIntoLocalStorage();
    return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
    }
}

export const getApi = (url) => {
    return axios.get(url, {headers: headerInfo()})
}
