import React, {Component} from 'react';
import UserService from "./UserService";

class CreateAccount extends Component {

    creationError = 'Error creating account. Try again later.';

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: undefined,
            accountCreated: false,
            loading: false
        };
    }

    handleCreateResponse = (response) => {
        this.setState({loading: false});
        if (response.status === 201) {
            this.setState({accountCreated: true, errorMessage: undefined});
        } else {
            this.setState({errorMessage: this.loginError});
        }
    };

    handleCreateError = (e) => {
        this.setState({loading: false});
        if (e.response && e.response.status === 400)
            this.setState({errorMessage: e.response.data.message});
        else
            this.setState({errorMessage: this.creationError});
    };

    createAccount = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({errorMessage: "Passwords do not match."});
        } else {
            this.setState({loading: true});
            UserService.createAccount(this.state.username,
                this.state.password,
                this.handleCreateResponse,
                this.handleCreateError);
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    createInput(type, id, placeholder, value) {
        return <input type={type}
                      id={id}
                      autoComplete="off"
                      className="form-control mb-3"
                      placeholder={placeholder}
                      required="" value={value} onChange={this.handleChange}/>;
    }

    render() {
        const loadingDiv = this.state.loading &&
            <div className="d-flex align-items-center justify-content-center overlay">
                <div className="spinner-border text-primary" role="status"/>
            </div>;
        const loginButton = <button className="link-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.history.push("/login");
                                    }}>Login.</button>;
        const errorMessageDiv = this.state.errorMessage &&
            <div className="mb-2 text-danger">{this.state.errorMessage}</div>;
        const accountCreatedDiv = this.state.accountCreated &&
            <div className="mb-2 text-success">Your account has been created!</div>;

        return (
                <div className="d-flex h-100 align-items-center justify-content-center">
                    {loadingDiv}
                    <form className="flex-column w-25">
                        <h1 className="h3 mb-3 font-weight-normal">Create Account</h1>
                        {errorMessageDiv}
                        {accountCreatedDiv}
                        {this.createInput("text", "username", "Username", this.state.username)}
                        {this.createInput("password", "password", "Password", this.state.password)}
                        {this.createInput("password", "confirmPassword", "Confirm Password", this.state.confirmPassword)}
                        <button className="btn btn-lg btn-primary btn-block"
                                type="submit" onClick={this.createAccount}>
                            Create
                        </button>
                        <p className="mt-3 text-center">Already have an account? {loginButton}</p>
                    </form>
                </div>
        );
    }
}

export default CreateAccount;
