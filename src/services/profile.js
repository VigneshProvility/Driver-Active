import {getApi, putApi} from "../util/fetch-api";
import {PROFILE_REDUCER_INFO} from "../util/reducer";
import {store} from "../store";

const url = 'https://eumbrdevcloud.ddswireless.net/dpapi/driver';


async function updateDriver(profileInfo) {
    const driverUrl = `${url}/${getDriverId()}`;
    const payload = {
        data: profileInfo
    }
    await putApi(driverUrl, payload, false);
    store.dispatch({type: PROFILE_REDUCER_INFO.UPDATE_PROFILE, payload: profileInfo});
}

export const setProfileInfo = async () => {
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

/**
 * @param {String} address
 */
export const updateAddressForDriver = async (address) => {
    try {
        const addressFormat = {
            formattedAddress: address,
        }
        const profileInfo = getProfileInfo();
        profileInfo.attributes['address'] = addressFormat;
        await updateDriver(profileInfo);

    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @param {String} number
 */
export const updatePhoneForDriver = async (number) => {
    try {
        const addressFormat = {
            number
        }
        const profileInfo = getProfileInfo();
        profileInfo.attributes['phone2'] = addressFormat;
        await updateDriver(profileInfo);
    } catch (error) {
        throw new Error(error.message);
    }
}
