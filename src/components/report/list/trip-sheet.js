import React, {useEffect, useState} from "react";
import {FaArrowLeft, FaDownload} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";

import MUITable from "../../controls/mui-table";
import DatePickr from "../../controls/date-pickr";
import {downloadCSV} from "../../../util/file-download";
import {getApi} from "../../../util/fetch-api";
import {COLUMN_LIST, FOOTER_LIST} from "../../../services/trip-sheet";

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


    function fetchTripList() {
        const startDate = moment().format('YYYY-MM-DDTHH:mm:ss');
        const endDate = moment(selectedDate).add(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
        const url = `https://eumbrdevcloud.ddswireless.net/dpapi/driver/464/route-query?startTime=${startDate}&endTime=${endDate}`;
        return getApi(url);
    }


    useEffect(() => {
        try {
            const tripData = fetchTripList();
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
            <span>TAMPERE</span>
            <span>VICKY</span>
            <span>123</span>
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
