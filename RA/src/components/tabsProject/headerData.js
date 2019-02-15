export const HeaderData = {
    "studyConfigHeader": {
        "columnDefs": [
            {
                "headerName": "Assignment",
                "field": "assignment",
                "filter": "agTextColumnFilter",
                "width": 200

            },
            {
                "headerName": "Description",
                "field": "description",
                "width": 300,
                "filter": "agTextColumnFilter",
            },
            {
                "headerName": "Ratio",
                "field": "ratio",
                "filter": "agTextColumnFilter",
                "width": 200,
                "cellEditor": "NumericCellEditor"
            },
            {
                "headerName": "Sequence Limit",
                "field": "sequenceLimit",
                "filter": "agTextColumnFilter",
                "width": 150,
                "cellEditor": "NumericCellEditor"
            }
        ],
        "defaultColDef": {
            "editable": true
        },
        "gridHeight": 30,
        "gridWidth": 150,
        "rowSelection":"multiple",
    },

    "enrollmentTargetHeader": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "filter": "agTextColumnFilter",
                "width": 500

            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 450,
                "filter": "agTextColumnFilter",
            },
            {
                "headerName": "",
                "field": "EditColumn",
                "cellRenderer": "EditComponent",
                "cellRendererParams": {
                },
                "width": 50
            }
        ],
         "gridHeight": 30,
         "rowSelection":"multiple"
    }
};
