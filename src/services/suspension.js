import {getApi} from "../util/fetch-api";
import {SUSPENSION_REDUCER_INFO} from "../util/reducer";
import {getCompanyId, getDriverId} from "./profile";
import {store} from "../store";

export const setSuspensionList = async () => {
    try {
        const companyId = getCompanyId();
        const driverId = getDriverId();
        const url = `https://eumbrdevcloud.ddswireless.net/driver/company/${companyId}/driver/${driverId}/suspension`;
        const profileList = await getApi(url);
        store.dispatch({type: SUSPENSION_REDUCER_INFO.NEW_SUSPENSION, payload: profileList.data});
    } catch (error) {
        store.dispatch({type: SUSPENSION_REDUCER_INFO.RESET_SUSPENSION});
        return [];
    }

}


export const getSuspensionList = () => {
    const state = store.getState();
    return state.suspension.suspensionList ;
}
