import React, {useState} from "react";
import {FaDownload, FaArrowLeft} from "react-icons/fa";
import { FaDollarSign, FaMoneyBillWave } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { GiPathDistance } from 'react-icons/gi';
import {useNavigate} from "react-router-dom";

import MUITable from "../../controls/mui-table";
import DatePickr from "../../controls/date-pickr";

const columns = [
    { field: 'tripId', headerName: 'Trip ID', width: 200 },
    { field: 'vehicleId', headerName: 'Vehicle ID', width: 200 },
    { field: 'tripType', headerName: 'Trip Type', type: 'number', width: 200 },
    { field: 'pick', headerName: 'Pickup Location', type: 'number', width: 300 },
    { field: 'pickTime', headerName: 'Time of pickup', type: 'number', width: 200 },
    { field: 'dropoff', headerName: 'Drop off Location', type: 'number', width: 300 },
    { field: 'dropTime', headerName: 'Time of dropoff', type: 'number', width: 200 },
    { field: 'payment', headerName: 'Payment Type', type: 'number', width: 200 },
    { field: 'acc', headerName: 'Account', type: 'number', width: 200 },
    { field: 'tip', headerName: 'Tip', type: 'number', width: 200 },
    { field: 'price', headerName: 'Price', type: 'number', width: 200 },
];

const rows = [
    { tripId: 1, vehicleId: 0, tripType: 25 },
    { tripId: 2, vehicleId: 0, tripType: 30 },
    { tripId: 3, vehicleId: 0, tripType: 28 },
];

const FOOTER_LIST = [
    {
        title: 'Total Tip',
        icon: <FaMoneyBillWave/>,
        valuePath: '',
        defaultValue: 0
    },{
        title: 'Total Earnings',
        icon: <FaDollarSign/>,
        valuePath: '',
        defaultValue: 0
    },{
        title: 'Total Hours',
        icon: <MdAccessTime/>,
        valuePath: '',
        defaultValue: 0
    },{
        title: 'Total Distance',
        icon: <GiPathDistance/>,
        valuePath: '',
        defaultValue: 0
    },
];

const CAN_SHOW_FR_BCK_BTN = {
    forward: true,
    backward: true
}

function TripSheet() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    return <>
            <div className="col-12 report-header">
                <div className="col-1 back-page cell" onClick={() => navigate("/report")}>
                    <FaArrowLeft />
                </div>
                <div className="col-6 cell topic">
                    <span>Trip Report</span>
                </div>
                <div className="col-4 cell">
                    <DatePickr selectedDate={selectedDate} setSelectedDate={setSelectedDate} canShowBtn={CAN_SHOW_FR_BCK_BTN}/>
                </div>
            </div>
            <div className="trip-sheet col-11">
                <span>TAMPERE</span>
                <span>VICKY</span>
                <span>123</span>
                <span><FaDownload/></span>
            </div>
            <div className={'main-content col-11'}>
                <MUITable row={rows} id={'tripId'} column={columns}/>
            </div>
            <div className="trip-sheet-footer">
                {FOOTER_LIST.map((footer, index) => (
                    <div key={index} className={"container"}>
                        {footer.icon}
                        <span>{footer.title}</span>
                        <div className="value">
                            {footer.valuePath.length ? footer.valuePath : footer.defaultValue}
                        </div>
                    </div>
                ))}
            </div>
        </>;
}

export default TripSheet;
