import React from "react";

import Account from "./sections/account";
import License from "./sections/license";
import Suspension from "./sections/suspension";
import {convertDateFormat} from "../../util/common";

function getValueByPath (obj, configInfo) {
    const {valuePath, type, format} = configInfo;
    const value = valuePath?.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((acc, part) => acc?.[part], obj);
    if ( type === 'date' && value) return convertDateFormat(value, format);
    return value;
}

export default function ProfileSection(props) {
    const {profileInfo, setCanShowNewTabs} = props;
    return <>
        <Account profile={profileInfo} getValueByPath={getValueByPath} setCanShowNewTabs={setCanShowNewTabs}/>
        <License profile={profileInfo} getValueByPath={getValueByPath}/>
        <Suspension/>
    </>;
}
