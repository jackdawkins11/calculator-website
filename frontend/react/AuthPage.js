import {SignIn} from './SignIn.js';
import {SignUp} from './SignUp.js';

function TabBar( props ){
    let signInClasses = "tab " + ( props.signInTab ? "tab-active" : "tab-inactive" );
    let signUpClasses = "tab " + ( !props.signInTab ? "tab-active" : "tab-inactive" );
    return (
        <div className="tab-bar">
            <div className={signInClasses} onClick={ () => props.tabClick(true) } > Sign In </div>
            <div className={signUpClasses} onClick={ () => props.tabClick(false) } > Sign Up </div>
        </div>
    );
}

class AuthPage extends React.Component {
    constructor( props ){
        super(props);
        this.state = {
            signInTab: true
        };
    }
    tabClick( isSignInTab ){
        this.setState( {signInTab:isSignInTab } );
    }
    render(){
        if( this.state.signInTab ){
            return (
                <SignIn tabBar={
                <TabBar signInTab={this.state.signInTab}
                tabClick={ (b) => this.tabClick(b) } /> }
                signIn={this.props.signIn}
                />
            );
        }else{
            return (
                <SignUp tabBar={
                <TabBar tabClick={ (b) => this.tabClick(b) }
                signInTab={this.state.signInTab}
                />} />
            );
        }
    }
    
}



export {AuthPage};