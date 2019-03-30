import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
// import popper from 'popper';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import {spinner} from './assets/images'

const App = lazy(() => import ('./App'))

ReactDOM.render(
  <Suspense 
    fallback={
      <div className="loader">
        <img src={spinner} alt="loader" /> 
      </div>}
    >
    <App />
  </Suspense>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
