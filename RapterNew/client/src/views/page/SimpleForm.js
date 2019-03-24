import React from 'react'
import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, field }) => {
  const { type, placeholder, label, value } = field
  if (type === 'text' || type === 'email' || type === 'number' || type === 'checkbox') {
    return <input {...input} placeholder={placeholder} type={type} id={label} value={value} />
  } else if (type === 'select') {
    const { options } = field
    return (
      <select className="browser-default" name={field.name} onChange={input.onChange}>
        {options.map((option, index) => {
          return <option key={index} value={option.value}>{option.label}</option>
        })}
      </select>
    )
  } else {
    return <div>Type not supported.</div>
  }
}

const SimpleForm = ({ handleSubmit, fields }) => {
	
  return (
    <div>
      {fields.map(field => (
        <div key={field.name}>
		  <Field 
		    id = {field.name}
            name={field.name}
			label={field.label}
			component={renderField}
			value={field.value}
            field={field}
            />
        </div>
      ))}
      <div onClick={handleSubmit}>Submit</div>
    </div>
  )
}

export default reduxForm({
  form: 'simpleForm'
})(SimpleForm)