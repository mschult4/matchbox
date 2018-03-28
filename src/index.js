import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Spars from './Spars';
import Signups from './Signups';
import Bracket from './Bracket';
import Stats from './Stats';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
    <div>
        <Route exact path="/" component={Login} />
        <Route path="/boxers" component={App} />
        <Route path="/spars" component={Spars} />
        <Route path="/signups" component={Signups} />
        <Route path="/bracket" component={Bracket} />
        <Route path="/stats" component={Stats} />
    </div>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
