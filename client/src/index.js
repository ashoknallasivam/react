import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
// import { AppContainer } from 'react-hot-loader';
// import '../node_modules/materialize-css/dist/css/materialize.css';
import '../public/assets/sass/style.scss';
import AppLayout from './appLayout';
import { AUTH_USER, AUTH_TOKEN } from './actions/types';
import history from './helpers';
import store from './helpers/store';
import  'materialize-css';

const finaltoken = localStorage.getItem('finaltoken');
// If we have a tocken, cond¡sider the user to be signed in
if (finaltoken) {
  // We need to update application state
  store.dispatch({ type: AUTH_TOKEN });
}


const root = document.getElementById('root');

const renderApp = () => {
  ReactDOM.render(
    // <AppContainer>
      <Provider store={store}>
      <BrowserRouter>
          <AppLayout history={history} />
      
      </BrowserRouter>
      </Provider>
    // </AppContainer>
    , root,
  );
};

renderApp();

// if (module.hot) {
//   module.hot.accept('./appLayout', renderApp);
// }
