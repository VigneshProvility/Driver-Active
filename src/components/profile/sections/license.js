import React from "react";
import {MONTH_DATE_YEAR_FORMAT} from "../../../util/date_format";
import {useTranslation} from "react-i18next";

const LICENSE_LIST = [
    {
        title: 'licensing',
        rowClass: 'row profile-header',
        columnClass: 'mb-3',
        valuePath: ''
    },
    {
        title: 'issued',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[0].startTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    },
    {
        title: 'expires',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[0].endTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    },
    {
        title: 'driver license',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[2].number',
    },
    {
        title: 'driver license expiry',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[2].endTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    },
    {
        title: 'taxi badge',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[1].number'
    },
    {
        title: 'taxi badge expiry',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[1].endTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    }
];


export default function LicenseProfile(props) {
    const {getValueByPath, profile} = props;
    const {t} = useTranslation();
    return <div className="profile-container profile-padding">
        {LICENSE_LIST.map((header, index) => {
            return <div className={header.rowClass} key={index}>
                <div className="col-6 mb-3"><span>{t (header.title)}</span></div>
                <div className={`col-6 mb-3 ${header.columnClass}`}>
                    {header.valuePath ? <span> {getValueByPath(profile, header)} </span>: ''}
                </div>
            </div>
        })}
    </div>
}
