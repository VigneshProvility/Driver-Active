import React, {useState} from "react";

import {convertDateFormat} from "../../util/common";
import Account from './sections/account';
import License from './sections/license';
import Suspension from './sections/suspension';
import {getProfileInfo} from "../../services/profile";
import PasswordChange from "./updator/password-change";

function getValueByPath (obj, configInfo) {
    const {valuePath, type, format} = configInfo;
    const value = valuePath?.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((acc, part) => acc?.[part], obj);
    if ( type === 'date' && value) return convertDateFormat(value, format);
    return value;
}

export default function Profile() {
    const [canShowNewTabs, setCanShowNewTabs] = useState({canShowPasswordChangeTab: false});
    const profileInfo = getProfileInfo()

    function renderProfileContainer() {
        if (canShowNewTabs.canShowPasswordChangeTab) {
            return <PasswordChange setCanShowNewTabs={setCanShowNewTabs} />;
        }
        return <>
            <Account profile={profileInfo} getValueByPath={getValueByPath} setCanShowNewTabs={setCanShowNewTabs}/>
            <License profile={profileInfo} getValueByPath={getValueByPath}/>
            <Suspension/>
        </>;
    }
    return renderProfileContainer();
}

