import {Calculator} from './Calculator.js';
import {MessageBox} from './MessageBox.js';

let message = { 'avatarChar': 'M',
    'messageSenderName': 'Muna Roy',
    'messageTime': '12:53 pm',
    'messageContent': '2+2=4'
};

let messages = [];
for( let i=0; i < 10; i++ ){
    messages.push( message );
}

let root = (
    <div className="homepage">
    <Calculator screenValue={0}/>
    <MessageBox messages={messages}/>
    </div>
    );

ReactDOM.render(root, document.getElementById("root"));
