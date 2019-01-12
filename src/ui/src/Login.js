import React, {Component} from 'react';
import AuthStore from "./AuthStore";
import UserService from "./UserService";

class Login extends Component {

    loginError = 'Error logging in. Try again later.';

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            errorMessage: undefined
        };
    }

    handleLoginResponse = (response) => {
        if (response.data && response.data.token) {
            AuthStore.saveToken(response.data.token);
            this.props.history.push("/")
        } else {
            this.setState({errorMessage: this.loginError});
        }
    };

    handleLoginError = (err) => {
        if (err.response && err.response.status === 400)
            this.setState({loading: false, errorMessage: err.response.data.message});
        else
            this.setState({loading: false, errorMessage: this.loginError});
    };

    login = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        UserService.login(this.state.username,
            this.state.password,
            this.handleLoginResponse,
            this.handleLoginError);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    createAccount = (event) => {
        event.preventDefault();
        this.props.history.push("/create");
    };

    render() {
        const loadingDiv = this.state.loading &&
            <div className="d-flex align-items-center justify-content-center overlay">
                <div className="spinner-border text-primary" role="status"/>
            </div>;

        const errorMessageDiv = this.state.errorMessage &&
            <div className="text-danger mb-2">{this.state.errorMessage}</div>;

        const createButton = <button className="link-button" onClick={this.createAccount}>Create one.</button>;

        return (
            <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                {loadingDiv}
                <form className="flex-column w-25">
                    <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
                    {errorMessageDiv}
                    <input autoComplete="off" type="username" id="username" className="form-control mb-3"
                           placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                    <input type="password" id="password" className="form-control mb-3" placeholder="Password"
                           value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>
                        Sign in
                    </button>
                    <p className="mt-3 text-center">Don't have an account? {createButton}</p>
                </form>
            </div>
        );
    }
}

export default Login;
