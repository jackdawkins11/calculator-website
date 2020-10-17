'use strict';

function SignUpUsername( props ){
    return (
        <div className="sign-up-username-wrapper">
            <div className="sign-up-username">
                <div className="sign-up-username-label">
                    Username
                </div>
                <input className="sign-up-username-input" onChange={props.onChange} ></input>
            </div>
        </div>
    );
}

function SignUpPassword( props ){
    return (
        <div className="sign-up-password-wrapper">
            <div className="sign-up-password">
                <div className="sign-up-password-label">
                    Password
                </div>
                <input className="sign-up-password-input" onChange={props.onChange} ></input>
            </div>
        </div>
    );
}

function SignUpPasswordConfirm( props ){
    return (
        <div className="sign-up-password-wrapper">
            <div className="sign-up-password">
                <div className="sign-up-password-label">
                    Confirm Password
                </div>
                <input className="sign-up-password-input" onChange={props.onChange} ></input>
            </div>
        </div>
    );
}

function SignUpMessage(props) {
    let hide = props.message.length == 0;
    let hideClassName = hide ? "hide" : "";
    return (
        <div className="sign-up-message-wrapper">
            <div className={"sign-up-message" + hideClassName}>
                {props.message}
            </div>
        </div>
    );
}

function SignUpButton( props ){
    return (
        <div className="sign-up-button-wrapper">
            <div className="sign-up-button" onClick={props.onClick} >
                Sign Up
            </div>
        </div>
    );
}

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            message: ""
        };
    }
    render(){
        return (
            <div className="sign-up">
                 {this.props.tabBar}
                <SignUpUsername onChange={ (event) => this.changeUsername(event) } />
                <SignUpPassword onChange={ (event) => this.changePassword(event) } />
                <SignUpPasswordConfirm onChange={ (event) => this.changeConfirmPassword(event) } />
                <SignUpMessage message={this.state.message} />
                <SignUpButton onClick={ () => this.signUp() } />
            </div>
        );
    }
    changeUsername( event ){
        this.setState({
            username: event.target.value
        });
    }
    changePassword( event ){
        this.setState({
            password: event.target.value
        });
    }
    changeConfirmPassword( event ){
        this.setState({
            confirmPassword: event.target.value
        });
    }
    signUp(){
        let username = this.state.username,
            password = this.state.password,
            confirmPassword = this.state.confirmPassword;
        if( username === "" || password === "" ){
            this.invalidInput( "All fields must be used" );
        }else if( password !== confirmPassword ){
            this.invalidInput( "Passwords must match" );
        }else{
            this.signUpRequest( username, password );
        }
    }
    signUpRequest( username, password ){
        let credentials = new URLSearchParams();
        credentials.append( "username", username );
        credentials.append( "password", password );
        fetch( "../backend/createAccount.php", {
            method: "POST",
            body: credentials
        }).then( (response) => response.json() )
        .then( result => {
            if( !result.error ){
                if( result.available ){
                    this.success();
                }else{
                    this.invalidInput( "That username is in use" );
                }
            }else{
                this.error();
            }
        }).catch( (reason) => {
            this.error();
        });
    }
    success(){
        this.setState({
            message: "Successfully created account"
        });
    }
    invalidInput( message ){
        this.setState({
            message: "Invalid input: " + message
        });
    }
    error(){
        this.setState({
            message: "There was an error signing up"
        });
    }
}

export {SignUp};