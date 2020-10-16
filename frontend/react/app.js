import {Calculator} from './Calculator.js';
import {MessageBox} from './MessageBox.js';
import { AuthPage } from './AuthPage.js';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasSession: false
        };
    }
    componentDidMount(){
        this.checkSession();
    }
    render(){
        if( this.state.hasSession ){
            return (
                <div className="homepage">
                    <div className="homepage-top-bar">
                        <div className="sign-out-button" onClick={() => this.signOut()}>
                            Sign Out
                        </div>
                    </div>
                    <div className="homepage-main">
                        <Calculator />
                        <MessageBox messages={getMessages()}/>
                    </div>
                </div>
                );
        }else{
            return (
                <div className="auth-page">
                    <AuthPage
                        signIn={ () => {this.checkSession() } }
                    />
                </div>
            );
        }
    }
    checkSession(){
        fetch( "../backend/checkSession.php" )
            .then( (response) => response.json() )
            .then( (result) => {
                this.setState({
                    hasSession: result.hasSession
                });
            }).catch( (reason) =>{
                this.errorMessage( "There was an error checking for a session: " + reason );
            });
    }
    signOut(){
        fetch( "../backend/endSession.php" )
            .then( response => {
                this.checkSession();
            }).catch( reason => {
                this.errorMessage( "There was an error signing out: " + reason );
            });
    }
    errorMessage( message ){
        console.log( message );
    }
}

function getMessages(){
    let message = { 'avatarChar': 'M',
    'messageSenderName': 'Muna Roy',
    'messageTime': '12:53 pm',
    'messageContent': '2+2=4'
    };

    let messages = [];
    for( let i=0; i < 10; i++ ){
        messages.push( message );
    }

    return messages;
}

ReactDOM.render( <App />, document.getElementById("root") );