import {FaDollarSign, FaMoneyBillWave} from "react-icons/fa";
import {MdAccessTime} from "react-icons/md";
import {GiPathDistance} from "react-icons/gi";

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
