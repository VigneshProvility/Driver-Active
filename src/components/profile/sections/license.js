import React from "react";
import {MONTH_DATE_YEAR_FORMAT} from "../../../util/date_format";

const LICENSE_LIST = [
    {
        title: 'Licensing',
        rowClass: 'row profile-header',
        columnClass: 'mb-3',
        valuePath: ''
    },
    {
        title: 'Issued',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[0].startTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    },
    {
        title: 'Expires',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[0].endTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    },
    {
        title: 'Driver License',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[2].number',
    },
    {
        title: 'Driver License Expiry',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[2].endTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    },
    {
        title: 'Taxi Badge',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[1].number'
    },
    {
        title: 'Taxi Badge Expiry',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'attributes.licenses[1].endTime',
        type: 'date',
        format: MONTH_DATE_YEAR_FORMAT
    }
];

export default function LicenseProfile(props) {
    const {getValueByPath, profile} = props;
    return <div className="profile-container profile-padding">
        {LICENSE_LIST.map((header, index) => {
            return <div className={header.rowClass} key={index}>
                <div className="col-6 mb-3"><span>{header.title}</span></div>
                <div className={`col-6 mb-3 ${header.columnClass}`}>
                    {header.valuePath ? <span> {getValueByPath(profile, header)} </span>: ''}
                </div>
            </div>
        })}
    </div>
}
