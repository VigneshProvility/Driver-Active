import {convertDateFormat} from "../util/common";
import {getApi} from "../util/fetch-api";
import {YEAR_MONTH_DATE_TIME_FORMAT} from "../util/date_format";
import {getCompanyId, getProfileInfo} from "./profile";


export const COLUMN_LIST = [
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
    },
    {
        field: 'passengerId',
        headerName: 'Passenger ID',
        width: 150,
    },
    {
        field: 'driverNumber',
        headerName: 'Driver Number',
        width: 150,
    },
    {
        field: 'tripType',
        headerName: 'Trip Type',
        width: 150,
    },
    {
        field: 'pickupText',
        headerName: 'Departure Addr',
        width: 300,
    },
    {
        field: 'dropOffText',
        headerName: 'Arrival Addr',
        width: 300,
    },
    {
        field: 'requestedDeparture',
        headerName: 'Requested Departure',
        width: 200,
    },
    {
        field: 'orderId',
        headerName: 'Order',
        width: 100,
    },
    {
        field: 'routeId',
        headerName: 'Route',
        width: 100,
    }
];

/**
 * @param {Number} companyId
 * @returns {Array}
 */
async function prepareVehicleOwnerList(companyId) {
    const badgeNr = getProfileInfo().attributes.badgeNr;
    const reportVehicleUrl = `https://eumbrdevreport.ddswireless.net:3013/report/company/${companyId}/vehicle?driverOwner=${badgeNr}`;
    const vehicleResponse = await getApi(reportVehicleUrl);
    return vehicleResponse.map(vehicle => vehicle.vehicleId).join(',');
}

/**
 * @param {String} startDate
 * @param {String} endDate
 * @returns {Array}
 */
export const fetchVehicleOwnerList = async (startDate, endDate) => {
    const companyId = getCompanyId();
    const vehicleOwner = await prepareVehicleOwnerList(companyId);
    const startDates = convertDateFormat(startDate,YEAR_MONTH_DATE_TIME_FORMAT);
    const endDates = convertDateFormat(endDate,YEAR_MONTH_DATE_TIME_FORMAT);
    const url = `https://eumbrdevreport.ddswireless.net:3014/report/company/${companyId}/passenger-travel?startTime=${startDates}&endTime=${endDates}&vehicleOwnList=${vehicleOwner}`;
    return getApi(url);
}
