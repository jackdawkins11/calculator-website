'use strict';

function SignInUsername( props ){
    return (
        <div className="sign-in-username-wrapper">
            <div className="sign-in-username">
                <div className="sign-in-username-label">
                    Username
                </div>
                <input className="sign-in-username-input"></input>
            </div>
        </div>
    );
}

function SignInPassword( props ){
    return (
        <div className="sign-in-password-wrapper">
            <div className="sign-in-password">
                <div className="sign-in-password-label">
                    Password
                </div>
                <input className="sign-in-password-input"></input>
            </div>
        </div>
    );
}

function SignInButton( props ){
    return (
        <div className="sign-in-button-wrapper">
            <div className="sign-in-button">
                Sign In
            </div>
        </div>
    );
}

class SignIn extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="sign-in">
                <SignInUsername />
                <SignInPassword />
                <SignInButton />
            </div>
        );
    }
}

export {SignIn};