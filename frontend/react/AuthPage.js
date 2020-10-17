import { SignIn } from './SignIn.js';
import { SignUp } from './SignUp.js';

function TabBar(props) {
    let signInClasses = "tab " + (props.signInTab ? "tab-active" : "tab-inactive");
    let signUpClasses = "tab " + (!props.signInTab ? "tab-active" : "tab-inactive");
    return (
        <div className="tab-bar">
            <div className={signInClasses} onClick={() => props.tabClick(true)} > Sign In </div>
            <div className={signUpClasses} onClick={() => props.tabClick(false)} > Sign Up </div>
        </div>
    );
}

function AuthPageRender( props ){
    return (
        <div className="auth-page">
            <div className="auth-box">
                <TabBar tabClick={props.tabClick}
                    signInTab={props.signInTab} />
                {props.innerAuthBox}
            </div>
        </div>
    );
}

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInTab: true
        };
    }
    tabClick(isSignInTab) {
        this.setState({ signInTab: isSignInTab });
    }
    render() {
        let innerAuthBox;
        if( this.state.signInTab ){
            innerAuthBox = <SignIn signIn={this.props.signIn} />;
        }else{
            innerAuthBox = <SignUp />;
        }
        return <AuthPageRender 
                tabClick={(b) => this.tabClick(b)}
                signInTab={this.state.signInTab}
                innerAuthBox={innerAuthBox} />;
    }
}

export { AuthPage };