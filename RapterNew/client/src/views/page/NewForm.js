import React from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import env from './controls.json';
const scaryAnimals = env;


class NewForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [{ name: "" }]
    };
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
	  
	const customStyles = { input: styles => {  return { ...styles, height: '1.7em'};  }}
	const { submitted, controls } = this.state;  
	  
	  
    return (
      <form onSubmit={this.handleSubmit}>
	  
	  <h4>Add an Element</h4>
	   <Select styles={customStyles} options={scaryAnimals} onChange={opt => this.setState({ controls: opt.value }) } required/>
	   
	   
        <input
          type="text"
          placeholder="Company name, e.g. Magic Everywhere LLC"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <h4>Shareholders</h4>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="small"
        >
          Add Shareholder
        </button>
        <button>Incorporate</button>
      </form>
    );
  }
}

export default NewForm;