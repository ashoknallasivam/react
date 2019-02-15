import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import AppLayout from './appLayout';
import 'babel-polyfill'; 
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../public/assets/sass/style.scss';

import { AUTH_USER,AUTH_TOKEN } from './actions/types';
import history from './helpers';
import store from './helpers/store';
//import store from './helpers';

//alert(JSON.stringify(store));

const finaltoken = localStorage.getItem('finaltoken');
// If we have a tocken, cond¡sider the user to be signed in
if (finaltoken) {
  // We need to update application state
  store.dispatch({ type: AUTH_TOKEN });
}


ReactDom.render(<BrowserRouter>
      <Provider store={store}>
          <AppLayout history={history}/>
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
