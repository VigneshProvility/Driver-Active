import {FaChevronRight, FaCircle} from "react-icons/fa";
import {Rating} from "@mui/material";
import React from "react";
import {MUI_STAR_PRECISION_INFO} from "../../../util/common";
import {getRatingInfo} from "../../../services/rating";

const ACCOUNT_LIST = [
    {
        title: 'Account',
        rowClass: 'row profile-header',
        columnClass: 'mb-3',
        valuePath: ''
    },
    {
        title: 'Full Name',
        rowClass: 'row mt-4 profile-content ',
        columnClass: 'profile-description',
        valuePath: 'attributes.name'
    },
    {
        title: 'DriverId',
        rowClass: 'row mt-4 profile-content',
        columnClass: 'profile-description',
        valuePath: 'attributes.badgeNr'
    },
    {
        title: 'Email',
        rowClass: 'row mt-4 profile-content',
        columnClass: 'profile-description',
        valuePath: 'attributes.email'
    },
    {
        title: 'Password',
        rowClass: 'row mt-4 profile-content',
        columnClass: 'profile-value profile-description',
        valuePath: '',
        canShowBtn: true,
        canShowPass: true,
        changeType: 'canShowPasswordChangeTab'
    },
    {
        title: 'Phone',
        rowClass: 'row mt-4 profile-content',
        columnClass: 'profile-value profile-description',
        valuePath: 'attributes.phone2.number',
        canShowBtn: true,
        changeType: 'canShowPhoneChangeTab'// means shows another view
    },
    {
        title: 'Address',
        rowClass: 'row mt-4 profile-content',
        columnClass: 'profile-value profile-description',
        valuePath: 'attributes.address.formattedAddress',
        canShowBtn: true,
        changeType: 'canShowAddressChangeTab'
    },
    {
        title: 'Company Rating',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'companyRating',
        canShowRating: true
    },
    {
        title: 'Driver Rating',
        rowClass: 'row mt-4 profile-content',
        columnClass: '',
        valuePath: 'driverRating',
        canShowRating: true
    }
];

function openAnotherWindow(setCanShowNewTabs, header) {
    const path = header.changeType
    setCanShowNewTabs(prev => (
        {
            ...prev,
            [path]: true
        }
    ));
}

export default function Account(props) {
    const {getValueByPath, profile, setCanShowNewTabs} = props;
    const rating = getRatingInfo();
    return <div className="profile-container">
        {ACCOUNT_LIST.map((header, index) => {
            return <div className={header.rowClass} key={index}>
                <div className="col-6 mb-3"><span>{header.title}</span></div>
                <div className={`col-6 mb-3 ${header.columnClass}`}>
                    {header.valuePath && !header.canShowRating ? <span> {getValueByPath(profile, header)} </span>: ''}
                    {header.canShowPass ? <span>{[...Array(5)].map((_, index) => (
                        <FaCircle key={index}/>
                    ))}</span> : ''}
                    {header.canShowBtn ? <span className={'show-pointer'} onClick={() => openAnotherWindow(setCanShowNewTabs, header)}><FaChevronRight/></span> : ''}
                    {header.canShowRating ? (
                        <>
                            <span>{getValueByPath(rating, header)}</span>
                            <Rating name="rating" value={parseInt(getValueByPath(rating, header.valuePath), 10)} precision={MUI_STAR_PRECISION_INFO.DECIMAL} />
                        </>
                    ) : null}

                </div>
            </div>
        })}
    </div>
};
