'use strict';

function SignInUsername(props) {
    return (
        <div className="auth-content">
            <div className="auth-content-label">
                Username
            </div>
            <input className="auth-content-input" onChange={props.onChange} ></input>
        </div>
    );
}

function SignInPassword(props) {
    return (
        <div className="auth-content">
            <div className="auth-content-label">
                Password
            </div>
            <input className="auth-content-input" onChange={props.onChange} ></input>
        </div>
    );
}

function SignInMessage(props) {
    let hide = props.message.length == 0;
    let hideClassName = hide ? "hide" : "";
    return (
        <div className="auth-content">
            <div className="auth-content-message">
                {props.message}
            </div>
        </div>
    );
}

function SignInButton(props) {
    return (
        <div className="auth-content">
            <div className="auth-content-button" onClick={props.onClick} >
                Sign In
            </div>
        </div>
    );
}

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            username: "",
            password: "",
            message: ""
        });
    }
    render() {
        return (
            <div className="auth-box-main">
                <SignInUsername onChange={(event) => this.changeUsername(event)} />
                <SignInPassword onChange={(event) => this.changePassword(event)} />
                <SignInMessage message={this.state.message} />
                <SignInButton onClick={() => this.signIn()} />
            </div>
        );
    }
    changeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }
    changePassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    signIn() {
        let username = this.state.username;
        let password = this.state.password;
        let credentials = new URLSearchParams();
        credentials.append("username", username);
        credentials.append("password", password);
        fetch("../backend/startSession.php", {
            method: "POST",
            body: credentials
        }).then((response) => response.json())
            .then(result => {
                if (!result.error) {
                    if (result.hasSession) {
                        this.props.signIn();
                    } else {
                        this.invalidCredentials();
                    }
                } else {
                    this.errorMessage();
                }
            }).catch((reason) => {
                this.errorMessage();
            });
    }
    invalidCredentials() {
        this.setState({
            message: "Invalid username and password."
        });
    }
    errorMessage() {
        this.setState({
            message: "There was an error signing in."
        });
    }
}

export { SignIn };