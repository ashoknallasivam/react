import React, { Component } from 'react';

class NumericCellEditor extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    onKeyPress = (event) => {
        if (this.props.column.colId === 'sequenceLimit') {
            if (!isNumeric(event.nativeEvent)) {
                event.preventDefault();
            }
        }
        function isNumeric(event) {
            return /\d/.test(event.key);
        }
    } 
    onChange = (e) => {
        if (this.props.column.colId === 'ratio') {
            if (e.target.value <= 1 && e.target.value >= 0) {
                const expression = ("(\\d{0," + parseInt(1) + "})[^.]*((?:\\.\\d{0," + parseInt(2) + "})?)");
                const rg = new RegExp(expression, "g");
                const match = rg.exec(e.target.value);
                e.target.value = match[1] + match[2];
            }
            else {
                e.target.value = "";
                window.Materialize.toast('Ratio should not be more than 1', 1000);
            }
        }
    }
    getValue() {
        return this.textInput.current.value;
    }
    render() { 
        return (
            <input onKeyPress={this.onKeyPress} onChange={this.onChange} ref={this.textInput} defaultValue={this.props.value}/>
        );
    }
}
export default NumericCellEditor;