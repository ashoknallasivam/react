import React, { Component, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import EditComponent from '../editComponent';
import DeleteComponent from '../deleteGridRow';

class ReactGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameworkComponents: {
                EditComponent: EditComponent,
                DeleteComponent: DeleteComponent
            }
        };
    }
    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
    }
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
    getSelectedRows = () => {
        const selectedData = this.gridApi.getSelectedRows();
        return selectedData;
    }
    refreshCells = (params) =>{
        this.gridApi.refreshCells(params);
    }
    removeSelectedRows = (data) => {
        this.gridApi.updateRowData({ remove: data });
    }
    render() {
        return (
            <Fragment>
                <div className="ag-theme-balham pl-2 pr-2 pb-2 mb-1" style={{ "height": "30vh" }} >
                    <AgGridReact
                        columnDefs={this.props.gridColData.columnDefs}
                        rowData={this.props.gridRowData}
                        onGridReady={this.onGridReady}
                        // rowHeight="30"
                        rowClassRules={this.state.rowClassRules}
                        rowSelection={this.props.gridColData.rowSelection}
                        rowMultiSelectWithClick={true}
                        rowDeselection={true}
                        rowMultiSelectWithClick={true}
                        frameworkComponents={this.state.frameworkComponents} >
                    </AgGridReact>
                </div>
            </Fragment>
        );
    }
}

export default ReactGrid;
