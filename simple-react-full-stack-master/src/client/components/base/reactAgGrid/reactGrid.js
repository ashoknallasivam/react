import React, { Component, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import EditComponent from '../EditComponent';
import NumericCellEditor from '../numericCellEditor';

class ReactGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowClassRules: {
                "oddRowColor": function (params) {
                    if (params.node.rowIndex % 2 === 0) {
                        return true;
                    }
                }
            },
            frameworkComponents: {
                NumericCellEditor: NumericCellEditor,
                EditComponent: EditComponent
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

    removeSelectedRows = (data) => {
        this.gridApi.updateRowData({ remove: data });
    }
    render() {
        return (
            <Fragment>
                <div className="ag-theme-balham" style={{ "height": this.props.gridColData.gridHeight + "vh" }}>
                    <AgGridReact
                        columnDefs={this.props.gridColData.columnDefs}
                        rowData={this.props.gridRowData}
                        onGridReady={this.onGridReady}
                        rowHeight="30"
                        rowClassRules={this.state.rowClassRules}
                        rowSelection={this.props.gridColData.rowSelection}
                        rowMultiSelectWithClick={true}
                        rowDeselection={true}
                        defaultColDef={this.props.gridColData.defaultColDef}
                        onCellValueChanged={this.props.editGridRowData}
                        frameworkComponents={this.state.frameworkComponents}
                    >
                    </AgGridReact>
                </div>
            </Fragment>
        );
    }
}

export default ReactGrid;
