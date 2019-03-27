export const HeaderData = {
    "enrollmentTargetHeaderView": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "width": 350

            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 350
            },
        ],
         "rowSelection":"single"
    },
    "enrollmentTargetHeaderCreate": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "width": 350

            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 350
            },
            {
                "headerName": "",
                "field": "EditColumn",
                "cellRenderer": "EditComponent",
                "cellRendererParams": {
                },
                "width": 75
            },
            // {
            //     "headerName": "",
            //     "field": "DeleteColumn",
            //     "cellRenderer": "DeleteComponent",
            //     "cellRendererParams": {
            //     },
            //     "width": 75
            // }
        ],
        //  "gridHeight": 30,
        // "gridWidth": 140,
         "rowSelection":"single"
    }
};
