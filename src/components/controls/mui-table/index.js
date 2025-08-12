import {DataGrid} from "@mui/x-data-grid";
import React from "react";

export default function MUITable(props) {
    return<>
        <DataGrid
            rows={props.row}
            getRowId={(row) => row[props.id]}
            columns={props.column}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            hideFooter
        />
    </>
}
