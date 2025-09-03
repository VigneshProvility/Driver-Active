import {getApi} from "../util/fetch-api";
import {PROFILE_REDUCER_INFO} from "../util/reducer";
import {store} from "../store";

export const setProfileInfo = async () => {
    const url = 'https://eumbrdevcloud.ddswireless.net/dpapi/driver';
    const profileList = await getApi(url, false);
    store.dispatch({type: PROFILE_REDUCER_INFO.NEW_PROFILE, payload: profileList.data[0]});
}


export const getProfileInfo = () => {
    const state = store.getState();
    return state.profile?.driverInfo;
}

export const getCompanyId = () => {
    const driver = getProfileInfo();
    return driver.attributes.provider.id;
}

export const getDriverId = () => {
    const driver = getProfileInfo();
    return driver.id;
}

export const getDriverEmail = () => {
    const driver = getProfileInfo();
    return driver.attributes.email;
}
