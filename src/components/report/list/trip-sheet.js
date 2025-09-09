import React, {useEffect, useState} from "react";
import {FaArrowLeft, FaDownload} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";

import MUITable from "../../controls/mui-table";
import DatePickr from "../../controls/date-pickr";
import {downloadCSV} from "../../../util/file-download";
import {COLUMN_LIST, fetchTripList, FOOTER_LIST, getUserInfoForReport} from "../../../services/trip-sheet";

const CAN_SHOW_FR_BCK_BTN = {
    forward: true,
    backward: true
}

const TITLE = 'trip-sheet-report';

function downloadTripSheet(tripList) {
    const data = {
        header: COLUMN_LIST,
        data: tripList.data
    }
    return downloadCSV(data, TITLE);
}

function TripSheet() {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [tripList, setTripList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const tripData = fetchTripList(selectedDate);
            setTripList(tripData);
        } catch (e) {
            toast.error(e.message);
        }
    },[selectedDate]);


    return <>
        <div className="col-12 report-header">
            <div className="col-1 back-page cell" onClick={() => navigate("/report")}>
                <FaArrowLeft/>
            </div>
            <div className="col-6 cell topic">
                <span>Trip Report</span>
            </div>
            <div className="col-4 cell">
                <DatePickr selectedDate={selectedDate} setSelectedDate={setSelectedDate}
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
