import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from "redux-thunk";
import {appConstants as constants} from 'appConstants';
import reducers from "../reducers";

const BootstrapedElement = document.getElementById(constants.ELEMENT_TO_BOOTSTRAP);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Enable redux Logger only when Dev mode
const __DEV__ = true;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
