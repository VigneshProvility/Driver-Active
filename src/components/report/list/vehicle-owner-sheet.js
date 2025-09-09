import React, {useEffect, useState} from "react";
import {FaArrowLeft, FaDownload} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";

import MUITable from "../../controls/mui-table";
import DatePickr from "../../controls/date-pickr";
import {downloadCSV} from "../../../util/file-download";
import {COLUMN_LIST, fetchVehicleOwnerList} from "../../../services/vehicle-owner-sheet";
import {getUserInfoForReport} from "../../../services/trip-sheet";

const CAN_SHOW_FR_BCK_BTN = {
    forward: false,
    backward: false
}

const TITLE = 'vehicle-owner-sheet-report';

function downloadTripSheet(tripList) {
    const data = {
        header: COLUMN_LIST,
        data: tripList.data
    }
    return downloadCSV(data, TITLE);
}

function VehicleOwnerSheet() {
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());
    const [tripList, setTripList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        try {
            const tripData = fetchVehicleOwnerList(startDate, endDate);
            setTripList(tripData);
        } catch (e) {
            toast.error(e.message);
        }
    },[startDate, endDate]);


    return <>
        <div className="col-12 report-header">
            <div className="col-1 back-page cell" onClick={() => navigate("/report")}>
                <FaArrowLeft/>
            </div>
            <div className="col-3 cell topic">
                <span>Vehicle Owner Sheet</span>
            </div>
            <div className="col-3 cell multi-Date-picker">
                <span>From: </span>
                <DatePickr selectedDate={startDate} setSelectedDate={setStartDate}
                           canShowBtn={CAN_SHOW_FR_BCK_BTN}/>
            </div>
            <div className="col-3 cell  multi-Date-picker">
                <span>To: </span>
                <DatePickr selectedDate={endDate} setSelectedDate={setEndDate}
                           canShowBtn={CAN_SHOW_FR_BCK_BTN}/>
            </div>
        </div>
        <div className="trip-sheet col-11">
            {getUserInfoForReport().map(values => <span>{values}</span>)}
            <span className="show-pointer" onClick={() => downloadTripSheet(tripList)}><FaDownload/></span>
        </div>
        <div className={'main-content col-11'}>
            <MUITable row={tripList.data} id={'tripId'} column={COLUMN_LIST}/>
        </div>
    </>;
}

export default VehicleOwnerSheet;
