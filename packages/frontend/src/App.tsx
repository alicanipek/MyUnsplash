import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Auth from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Posts from './pages/Posts';

function App() {
    return (
        <div>
            <Auth>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <PrivateRoute path="/posts" component={Posts} />
                    </Switch>
                </BrowserRouter>
            </Auth>
        </div>
    );
}

export default hot(App);
