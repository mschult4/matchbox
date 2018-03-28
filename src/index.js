import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
    <div>
        <Route exact path="/" component={Login} />
        <Route path="/boxers" component={App} />
    </div>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
