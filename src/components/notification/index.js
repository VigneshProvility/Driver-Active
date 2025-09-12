import React from 'react';
import { FaChevronRight } from "react-icons/fa";
import {driverExpiryList, licenseExpiryCount} from "../../services/license-expiry";
import {useNavigate} from "react-router-dom";

export default function Notification() {

    const driver = driverExpiryList();
    const count = licenseExpiryCount();
    const navigate = useNavigate();

    return (
        <>
            <div className="notification-header row">
                <div className="col-md-3 col-9 warning-container">
                    <div className="row no-gutters">
                        <div className="col-md-6 col-6">
                            <span>URGENT</span>
                        </div>
                        <div className={`col-md-6 col-6 text-end ${count > 0 ? 'text-danger' : ''}`}>
                            <span>{count}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="notification-content">
                <div className="notification-value row">
                    <strong>Notifications (URGENT)</strong>
                </div>
                {driver.length > 0 ?  driver.map((item, index) => {
                    // eslint-disable-next-line array-callback-return
                    if(!item) return;
                    return <div className="notification-value mt-3 row" key={index}>
                        <div className={`col-md-6 col-9 ${item.type}`}>
                            <span>{item.message}</span>
                        </div>
                        <div className="col-md-6 col-3 text-end show-pointer">
                            <FaChevronRight onClick={() => navigate('/profile')}/>
                        </div>
                    </div>
                }): (
                    <div className="notification-value mt-3 row">
                        <div className="col-12">
                            <span>No urgent notifications.</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
