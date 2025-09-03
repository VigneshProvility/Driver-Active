import {getApi} from "../util/fetch-api";
import {RATING_REDUCER_INFO} from "../util/reducer";
import {getCompanyId, getDriverId} from "./profile";
import {store} from "../store";

export const setRatingInfo = async () => {
    try {
        const companyId = getCompanyId();
        const driverId = getDriverId();
        const url = `https://eumbrdevcloud.ddswireless.net/driver/company/${companyId}/driver/${driverId}/rating`;
        const profileList = await getApi(url);
        store.dispatch({type: RATING_REDUCER_INFO.NEW_RATING, payload: profileList.data});
    } catch (error) {
        store.dispatch({type: RATING_REDUCER_INFO.RESET_RATING});
        return {}
    }

}


export const getRatingInfo = () => {
    const state = store.getState();
    return state.rating.ratingInfo;
}
