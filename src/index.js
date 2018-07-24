import React from 'react';
import ReactDOM from 'react-dom';
import './dfacto-grid.css';
import './App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
