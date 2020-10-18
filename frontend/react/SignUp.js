'use strict';

function SignUpUsername(props) {
    return (
        <div className="auth-content">
            <div className="auth-content-label">
                Username
            </div>
            <input className="auth-content-input" onChange={props.onChange} ></input>
        </div>
    );
}

function SignUpPassword(props) {
    return (
        <div className="auth-content">
            <div className="auth-content-label">
                Password
            </div>
            <input type="password" className="auth-content-input" onChange={props.onChange} ></input>
        </div>
    );
}

function SignUpPasswordConfirm(props) {
    return (
        <div className="auth-content">
            <div className="auth-content-label">
                Confirm Password
            </div>
            <input type="password" className="auth-content-input" onChange={props.onChange} ></input>
        </div>
    );
}

function SignUpMessage(props) {
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

function SignUpButton(props) {
    return (
        <div className="auth-content">
            <div className="auth-content-button" onClick={props.onClick} >
                Sign Up
            </div>
        </div>
    );
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            message: ""
        };
    }
    render() {
        return (
            <div className="sign-up">
                <SignUpUsername onChange={(event) => this.changeUsername(event)} />
                <SignUpPassword onChange={(event) => this.changePassword(event)} />
                <SignUpPasswordConfirm onChange={(event) => this.changeConfirmPassword(event)} />
                <SignUpMessage message={this.state.message} />
                <SignUpButton onClick={() => this.signUp()} />
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
    changeConfirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }
    signUp() {
        let username = this.state.username,
            password = this.state.password,
            confirmPassword = this.state.confirmPassword;
        if (username === "" || password === "") {
            this.invalidInput("All fields must be used");
        } else if (password !== confirmPassword) {
            this.invalidInput("Passwords must match");
        } else {
            this.signUpRequest(username, password);
        }
    }
    signUpRequest(username, password) {
        let credentials = new URLSearchParams();
        credentials.append("username", username);
        credentials.append("password", password);
        fetch("../backend/createAccount.php", {
            method: "POST",
            body: credentials
        }).then((response) => response.json())
            .then(result => {
                if (!result.error) {
                    if (result.available) {
                        this.success();
                    } else {
                        this.invalidInput("That username is in use");
                    }
                } else {
                    this.error();
                }
            }).catch((reason) => {
                this.error();
            });
    }
    success() {
        this.setState({
            message: "Successfully created account"
        });
    }
    invalidInput(message) {
        this.setState({
            message: "Invalid input: " + message
        });
    }
    error() {
        this.setState({
            message: "There was an error signing up"
        });
    }
}

export { SignUp };