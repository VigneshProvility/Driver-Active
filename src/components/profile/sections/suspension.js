import MUITable from "../../controls/mui-table";
import React, {useEffect, useState} from "react";
import {getSuspensionList} from "../../../services/suspension";
import {useTranslation} from "react-i18next";

const SUSPENSION_COLUMN_LIST = [
    {
        field: 'from',
        headerName: 'from',
        width: 200
    },
    {
        field: 'to',
        headerName: 'to',
        width: 200
    },
    {
        field: 'reason ',
        headerName: 'reason',
        width: 200
    },
];

export default function Suspension() {
    const suspensionList = getSuspensionList();
    const [columnList, setColumnList] = useState([]);
    const {t, i18n } = useTranslation();



    useEffect(() => {
        const translatedColumnList = SUSPENSION_COLUMN_LIST.map((column) => ({
            ...column,
            headerName: t(column.headerName)
        }));
        setColumnList(translatedColumnList);
    }, [i18n, t]);
    return  <div className="profile-container profile-padding">
        <div className='row profile-header'>
            <div className="col-6 mb-3"><span>Suspension</span></div>
        </div>
        <div className='suspension-table'>
            <MUITable row={suspensionList} column={columnList}/>
        </div>
    </div>
}
