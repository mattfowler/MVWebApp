import React, {Component} from 'react';
import {Route, Switch, Redirect, Link} from "react-router-dom";
import Login from "./Login";
import AuthStore from "./AuthStore";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import axios from "axios/index";

class App extends Component {

    logout = (event) => {
        event.preventDefault();
        AuthStore.removeToken();
        this.setState({});
    };

    componentWillMount() {
        axios.defaults.timeout = 10000;
        axios.defaults.headers.common['Authorization'] = `Bearer ${AuthStore.getToken()}`;
    }

    render() {
        function PrivateRoute({component: Component, ...rest}) {
            return (
                <Route
                    {...rest}
                    render={(props) => AuthStore.isLoggedIn()
                        ? <Component {...props}/>
                        : <Redirect to={{pathname: '/login'}}/>}/>
            );
        }

        const logout = <button className="link-button nav-link" onClick={this.logout}> Logout</button>;

        return (
            <div className='h-100'>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand">MVWebapp</div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item active">
                                {AuthStore.isLoggedIn() && logout}
                            </li>
                        </ul>

                    </div>
                </nav>
                <div className='h-100'>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/create" component={CreateAccount}/>
                        <PrivateRoute path="/" component={Home}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
