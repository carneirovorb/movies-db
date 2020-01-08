import React from 'react';
import ReactDOM from 'react-dom';
import { registerServiceWorker } from './serviceWorker';
import './index.css';
import App from './App';

registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));


