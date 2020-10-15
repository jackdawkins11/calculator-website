import {Calculator} from './Calculator.js';
import {MessageBox} from './MessageBox.js';
import {SignIn} from './SignIn.js';
import {SignUp} from './SignUp.js';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasSession: true
        };
    }

    render(){
        if( this.state.hasSession ){
            return (
                <div className="homepage">
                <Calculator />
                <MessageBox messages={getMessages()}/>
                </div>
                );
        }else{
            return (
                <div className="auth-page">
                    <SignIn />
                </div>
            );
        }
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