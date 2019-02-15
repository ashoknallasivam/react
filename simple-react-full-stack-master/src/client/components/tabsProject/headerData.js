export const HeaderData = {
    "studyConfigHeader": {
        "columnDefs": [
            {
                "headerName": "Assignment",
                "field": "assignment",
                "filter": "agTextColumnFilter",
                "width": 250

            },
            {
                "headerName": "Description",
                "field": "description",
                "width": 250,
                "filter": "agTextColumnFilter",
            },
            {
                "headerName": "Ratio",
                "field": "ratio",
                "filter": "agTextColumnFilter",
                "width": 240

            },
            {
                "headerName": "Sequence Limit",
                "field": "sequenceLimit",
                "filter": "agTextColumnFilter",
                "width": 240

            }
        ],
        "defaultColDef": {
            "editable": true
        },
        "gridHeight": 30,
        "rowSelection":"multiple"
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
                "editable": true,
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
