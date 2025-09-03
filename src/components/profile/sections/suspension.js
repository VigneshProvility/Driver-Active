import MUITable from "../../controls/mui-table";
import React from "react";
import {getSuspensionList} from "../../../services/suspension";

const SUSPENSION_COLUMN_LIST = [
    {
        field: 'from',
        headerName: 'From',
        width: 200
    },
    {
        field: 'to',
        headerName: 'To',
        width: 200
    },
    {
        field: 'reason ',
        headerName: 'Reason',
        width: 200
    },
];

export default function Suspension() {
    const suspensionList = getSuspensionList();
    return  <div className="profile-container profile-padding">
        <div className='row profile-header'>
            <div className="col-6 mb-3"><span>Suspension</span></div>
        </div>
        <div className='suspension-table'>
            <MUITable row={suspensionList} column={SUSPENSION_COLUMN_LIST}/>
        </div>
    </div>
}
