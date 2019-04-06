export const HeaderData = {
    "enrollmentTargetHeaderView": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "width": 500

            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 480
            },
        ],
        "rowSelection": "single",
        "defaultColDef": { "resizable": true }
    },
    "enrollmentTargetHeaderCreate": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "width": 400

            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 400
            },
            {
                "headerName": "",
                "field": "EditColumn",
                "cellRenderer": "EditComponent",
                "cellRendererParams": {
                },
                "width": 75
            },
            {
                "headerName": "",
                "field": "DeleteColumn",
                "cellRenderer": "DeleteComponent",
                "cellRendererParams": {
                },
                "width": 75
            }
        ],
        "rowSelection": "single",
        "defaultColDef": { "resizable": true }
    }
};
