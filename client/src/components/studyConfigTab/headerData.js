export const HeaderData = {
    "Headerdata_View": {
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
            }
        ],
        "rowSelection": "single"
    },
    "Headerdata": {
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
                "cellRendererParams": { "action": "editAction" },
                "width": 50
            },
            {
                "headerName": "",
                "field": "DeleteColumn",
                "cellRenderer": "DeleteComponent",
                "cellRendererParams": { "action": "editAction" },
                "width": 50
            }
        ],
        "rowSelection": "single"
    }
}