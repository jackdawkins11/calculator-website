'use strict';

function SignUpUsername( props ){
    return (
        <div className="sign-up-username-wrapper">
            <div className="sign-up-username">
                <div className="sign-up-username-label">
                    Username
                </div>
                <input className="sign-up-username-input"></input>
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
                <input className="sign-up-password-input"></input>
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
                <input className="sign-up-password-input"></input>
            </div>
        </div>
    );
}

function SignUpButton( props ){
    return (
        <div className="sign-up-button-wrapper">
            <div className="sign-up-button">
                Sign Up
            </div>
        </div>
    );
}

class SignUp extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="sign-up">
                 {this.props.tabBar}
                <SignUpUsername />
                <SignUpPassword />
                <SignUpPasswordConfirm />
                <SignUpButton />
            </div>
        );
    }
}

export {SignUp};