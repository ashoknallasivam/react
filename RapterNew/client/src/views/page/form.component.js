import React from 'react';
import { Field,reduxForm } from 'redux-form';

import Select from './select';

export const FormComponent = ({ handleSubmit, onSubmit }) => {
  return (
    <div className="flex flex-column justify-center items-center">
      <h1>My Very own Form</h1>
      <form  className="w-80"  >
        <Field
          name="meatChoice"
          label="Meat Choice"
          component={Select}
          options={{
            pork: 'Pork',
            beef: 'Beef',
            chicken: 'Chicken'
          }}
        />
</form> </div> )
}


export default reduxForm({
  form: 'simpleForm'
})(FormComponent)