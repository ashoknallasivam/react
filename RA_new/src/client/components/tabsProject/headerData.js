export const HeaderData = {
    "studyConfigHeader": {
        "columnDefs": [
            {
                "headerName": "Assignment",
                "field": "assignment",
                "width": 200

            },
            {
                "headerName": "Description",
                "field": "description",
                "width": 200
            },
            {
                "headerName": "Ratio",
                "field": "ratio",
                "width": 200
            },
            {
                "headerName": "Sequence Limit",
                "field": "sequenceLimit",
                "width": 150
            },
            {
                "headerName": "",
                "field": "EditColumn",
                "cellRenderer": "EditComponent",
                "cellRendererParams": {
                },
                "width": 50
            },
            {
                "headerName": "",
                "field": "DeleteColumn",
                "cellRenderer": "DeleteComponent",
                "cellRendererParams": {
                },
                "width": 50
            }
        ],
        "gridHeight": 30,
        "gridWidth": 140,
        "rowSelection":"single",
    },

    "enrollmentTargetHeader": {
        "columnDefs": [
            {
                "headerName": "Month",
                "field": "month",
                "width": 300

            },
            {
                "headerName": "Target",
                "field": "target",
                "width": 300
            },
            {
                "headerName": "",
                "field": "EditColumn",
                "cellRenderer": "EditComponent",
                "cellRendererParams": {
                },
                "width": 60
            },
            {
                "headerName": "",
                "field": "DeleteColumn",
                "cellRenderer": "DeleteComponent",
                "cellRendererParams": {
                },
                "width": 60
            }
        ],
         "gridHeight": 30,
         "gridWidth": 120,
         "rowSelection":"single"
    }
};
