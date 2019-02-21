import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import '../../node_modules/materialize-css/dist/css/materialize.css';
import '../../public/assets/sass/style.scss';

import AppLayout from './appLayout';
import { AUTH_USER,AUTH_TOKEN } from './actions/types';
import history from './helpers';
import store from './helpers/store';
const finaltoken = localStorage.getItem('finaltoken');
// If we have a tocken, cond¡sider the user to be signed in
if (finaltoken) {
  // We need to update application state
  store.dispatch({ type: AUTH_TOKEN });
}

ReactDOM.render(<BrowserRouter>
      <Provider store={store}>
          <AppLayout history={history}/>
		  
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


