import {FaDollarSign, FaMoneyBillWave} from "react-icons/fa";
import {MdAccessTime} from "react-icons/md";
import {GiPathDistance} from "react-icons/gi";
import moment from "moment/moment";
import {getApi} from "../util/fetch-api";
import {YEAR_MONTH_DATE_TIME_FORMAT} from "../util/date_format";
import {getDriverId, getProfileInfo} from "./profile";

export const COLUMN_LIST = [
    { field: 'tripId', headerName: 'trip id', width: 200 },
    { field: 'vehicleId', headerName: 'vehicle id', width: 200 },
    { field: 'tripType', headerName: 'trip type', type: 'number', width: 200 },
    { field: 'pick', headerName: 'pickup location', type: 'number', width: 300 },
    { field: 'pickTime', headerName: 'time of pickup', type: 'number', width: 200 },
    { field: 'dropoff', headerName: 'drop off location', type: 'number', width: 300 },
    { field: 'dropTime', headerName: 'time of dropoff', type: 'number', width: 200 },
    { field: 'payment', headerName: 'payment type', type: 'number', width: 200 },
    { field: 'acc', headerName: 'account', type: 'number', width: 200 },
    { field: 'tip', headerName: 'tip', type: 'number', width: 200 },
    { field: 'price', headerName: 'price', type: 'number', width: 200 },
];


export const FOOTER_LIST = [
    {
        title: 'total tip',
        icon: <FaMoneyBillWave />,
        valuePath: '',
        defaultValue: 0
    },
    {
        title: 'total earnings',
        icon: <FaDollarSign />,
        valuePath: '',
        defaultValue: 0
    },
    {
        title: 'total hours',
        icon: <MdAccessTime />,
        valuePath: '',
        defaultValue: 0
    },
    {
        title: 'total distance',
        icon: <GiPathDistance />,
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
