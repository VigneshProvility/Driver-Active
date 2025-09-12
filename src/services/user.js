import {postApi} from "../util/fetch-api";

const headerInfo = () => {
    return {
        "Content-Type": "application/json",
    }
}

export const updatePassword = async (payload) => {
    try{
        const url = 'https://eumbrdevcloud.ddswireless.net//dpapi/ui/changepassword';
        const response  = await postApi(url, payload, false, headerInfo());
        return response;
    } catch (error) {
        throw error.message;
    }
}

export const login = async (payload) => {}
