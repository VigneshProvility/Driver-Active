import {setProfileInfo} from "./profile";
import {setRatingInfo} from "./rating";
import {setSuspensionList} from "./suspension";

export const initProfileInfo = async () => {
    await setProfileInfo();
    await setRatingInfo();
    await setSuspensionList();
}
