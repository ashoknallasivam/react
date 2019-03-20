import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'

const renderField = ({ input, label, children, type, meta: { touched, error } }) => {
  
    if (type === 'text' || type === 'email' || type === 'number' ) {
      return (
      <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} id={label} />

      {touched && error && <span>{error}</span>}
    </div>
  </div> )
    } else if (type === 'textarea') {
      return (
      <div>
    <label>{label}</label>
    <div>
      <textarea {...input} id={label}  placeholder={label}  rows="10" cols="40"/>
      

      {touched && error && <span>{error}</span>}
    </div>
  </div> )
    } else if (type === 'select') {
      
      return (

        <div>
        <label>{label}</label>
        <div>
        
        <select {...input} >
          
        </select>

        {touched && error && <span>{error}</span>}
    </div>
  </div> 
      )
    } else {
      return <div>Type not supported.</div>
    }

     
}


const renderNumber = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button className="btn " type="button" onClick={() => fields.push()}>Add Numeric</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        
        <Field
          name={hobby}
          type="number"
          component={renderField}
          label={`Numeric #${index + 1}`}/>
        <button
          className="btn "
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}>x</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderTextarea = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button className="btn " type="button" onClick={() => fields.push()}>Add Textarea</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        
        <Field
          name={hobby}
          type="textarea"
          component={renderField}
          label={`Textarea #${index + 1}`}/>
        <button
          className="btn "
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}>x</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderSelect = ({ fields, children, meta: { error } }) => (
  <ul>
    <li>
      <button className="btn " type="button" onClick={() => fields.push()}>Add Select</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        
        <Field
          name={hobby}
          type="select"
          component={renderField}
          label={`Select #${index + 1}`}/>
        <button
          className="btn "
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}>x</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderEmail = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button className="btn " type="button" onClick={() => fields.push()}>Add Email</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        
        <Field
          name={hobby}
          type="email"
          component={renderField}
          label={`Email #${index + 1}`}/>
        <button
          className="btn "
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}>x</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderInput = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button className="btn " type="button" onClick={() => fields.push({})}> Add Input </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) =>
      <li key={index}>
        
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="Input"/>
        <button
          className="btn "
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}>x</button>
      </li>
    )}
  </ul>
)

const FieldArraysForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>

      <FieldArray name="input" component={renderInput}/>
      <FieldArray name="number" component={renderNumber}/>
      <FieldArray name="email" component={renderEmail}/>
      <FieldArray name="textarea" component={renderTextarea}/>
      <FieldArray name="textarea" component={renderSelect}/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
  validate
})(FieldArraysForm)
