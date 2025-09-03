import axios from "axios";

import {getUserCrendIntoLocalStorage} from "../services/local-storage";
import {getDriverId} from "../services/profile";


function headerInfo (addDriverId=true) {
    const userInfo = getUserCrendIntoLocalStorage();
    const driverId = getDriverId();
    return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
            ...(addDriverId && driverId ? { 'driver-id': driverId } : {})

    }
}

export const getApi = async (url, addDriverId) => {
    const response = await axios.get(url, {headers : headerInfo(addDriverId)})
    return response.data;
}

export const postApi = async (url, payload, addDriverId, customizeHeader) => {
    const response = await axios.post(url, payload, {headers : customizeHeader ? customizeHeader : headerInfo(addDriverId)});
    return response.data;
}
