import {FaDollarSign, FaMoneyBillWave} from "react-icons/fa";
import {MdAccessTime} from "react-icons/md";
import {GiPathDistance} from "react-icons/gi";
import moment from "moment/moment";
import {getApi} from "../util/fetch-api";
import {YEAR_MONTH_DATE_TIME_FORMAT} from "../util/date_format";
import {getDriverId, getProfileInfo} from "./profile";

export const COLUMN_LIST = [
    {field: 'tripId', headerName: 'Trip ID', width: 200},
    {field: 'vehicleId', headerName: 'Vehicle ID', width: 200},
    {field: 'tripType', headerName: 'Trip Type', type: 'number', width: 200},
    {field: 'pick', headerName: 'Pickup Location', type: 'number', width: 300},
    {field: 'pickTime', headerName: 'Time of pickup', type: 'number', width: 200},
    {field: 'dropoff', headerName: 'Drop off Location', type: 'number', width: 300},
    {field: 'dropTime', headerName: 'Time of dropoff', type: 'number', width: 200},
    {field: 'payment', headerName: 'Payment Type', type: 'number', width: 200},
    {field: 'acc', headerName: 'Account', type: 'number', width: 200},
    {field: 'tip', headerName: 'Tip', type: 'number', width: 200},
    {field: 'price', headerName: 'Price', type: 'number', width: 200},
];

export const FOOTER_LIST = [
    {
        title: 'Total Tip',
        icon: <FaMoneyBillWave/>,
        valuePath: '',
        defaultValue: 0
    },
    {
        title: 'Total Earnings',
        icon: <FaDollarSign/>,
        valuePath: '',
        defaultValue: 0
    },
    {
        title: 'Total Hours',
        icon: <MdAccessTime/>,
        valuePath: '',
        defaultValue: 0
    },
    {
        title: 'Total Distance',
        icon: <GiPathDistance/>,
        valuePath: '',
        defaultValue: 0
    },
];


/**
 * @param {String} selectedDate
 * @returns {Promise<*>}
 */
export const fetchTripList = (selectedDate) => {
    const startDate = moment().format(YEAR_MONTH_DATE_TIME_FORMAT);
    const endDate = moment(selectedDate).add(1, 'days').format(YEAR_MONTH_DATE_TIME_FORMAT);
    const url = `https://eumbrdevcloud.ddswireless.net/dpapi/driver/${getDriverId()}/route-query?startTime=${startDate}&endTime=${endDate}`;
    return getApi(url, false);
}

export const getUserInfoForReport = () => {
    const {attributes} = getProfileInfo();
    return [attributes.provider.name, attributes.name, attributes.badgeNr];
}
