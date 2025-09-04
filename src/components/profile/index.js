import React, {useState} from "react";

import {getProfileInfo} from "../../services/profile";
import PasswordChange from "./updator/password-change";
import AddressChange from "./updator/address-change";
import ProfileSection from "./profile-section";
import PhoneNumberChange from "./updator/phone-number-change";

export default function Profile() {
    const [canShowNewTabs, setCanShowNewTabs] = useState({
        canShowPasswordChangeTab: false,
        canShowAddressChangeTab: false
    });
    const profileInfo = getProfileInfo();

    function renderProfileContainer() {
        if (canShowNewTabs.canShowPasswordChangeTab) {
            return <PasswordChange setCanShowNewTabs={setCanShowNewTabs} />;
        }
        if(canShowNewTabs.canShowAddressChangeTab) {
            return <AddressChange setCanShowNewTabs={setCanShowNewTabs} address={profileInfo.attributes.address.formattedAddress} />
        }
        if(canShowNewTabs.canShowPhoneChangeTab) {
            return <PhoneNumberChange setCanShowNewTabs={setCanShowNewTabs} number={profileInfo.attributes.phone2.number} />
        }
        return <ProfileSection setCanShowNewTabs={setCanShowNewTabs} profileInfo={profileInfo} />
    }
    return renderProfileContainer();
}

