import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Auth from './context/AuthContext';
import { ConfirmUser, Home, Login, Logout, Posts, Register } from './pages';

function App() {
    return (
        <Auth>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/posts" component={Posts} />
                    <Route
                        path="/users/confirm/:token"
                        component={ConfirmUser}
                    />
                </Switch>
            </BrowserRouter>
        </Auth>
    );
}

export default hot(App);
