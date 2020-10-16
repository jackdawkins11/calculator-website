'use strict';

function SignInUsername( props ){
    return (
        <div className="sign-in-username-wrapper">
            <div className="sign-in-username">
                <div className="sign-in-username-label">
                    Username
                </div>
                <input className="sign-in-username-input" onChange={props.onChange} ></input>
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
                <input className="sign-in-password-input" onChange={props.onChange} ></input>
            </div>
        </div>
    );
}

function SignInButton( props ){
    return (
        <div className="sign-in-button-wrapper">
            <div className="sign-in-button" onClick={props.onClick} >
                Sign In
            </div>
        </div>
    );
}

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            username: "",
            password: ""
        });
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
    render(){
        return (
            <div className="sign-in">
                {this.props.tabBar}
                <SignInUsername onChange={ (event) => this.changeUsername(event) } />
                <SignInPassword onChange={ (event) => this.changePassword(event) } />
                <SignInButton onClick={ () => this.signIn() } />
            </div>
        );
    }
    signIn(){
        let username = this.state.username;
        let password = this.state.password;
        this.props.signInButton( username, password );
    }
}

export {SignIn};