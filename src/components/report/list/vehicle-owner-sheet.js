import React, {useEffect, useState} from "react";
import {FaArrowLeft, FaDownload} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";

import MUITable from "../../controls/mui-table";
import DatePickr from "../../controls/date-pickr";
import {downloadCSV} from "../../../util/file-download";
import {getApi} from "../../../util/fetch-api";
import {COLUMN_LIST} from "../../../services/trip-sheet";
import {convertDateFormat} from "../../../util/common";

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


    function fetchTripList() {
        const startDates = convertDateFormat(startDate,'YYYY-MM-DDTHH:mm:ss');
        const endDates = convertDateFormat(endDate,'YYYY-MM-DDTHH:mm:ss');
        const url = `https://eumbrdevcloud.ddswireless.net/dpapi/driver/464/route-query?startTime=${startDates}&endTime=${endDates}`;
        return getApi(url, false);
    }


    useEffect(() => {
        try {
            const tripData = fetchTripList();
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
            <span>TAMPERE</span>
            <span>VICKY</span>
            <span>123</span>
            <span className="show-pointer" onClick={() => downloadTripSheet(tripList)}><FaDownload/></span>
        </div>
        <div className={'main-content col-11'}>
            <MUITable row={tripList.data} id={'tripId'} column={COLUMN_LIST}/>
        </div>
    </>;
}

export default VehicleOwnerSheet;
