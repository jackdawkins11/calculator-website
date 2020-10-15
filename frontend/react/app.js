import {Calculator} from './Calculator.js';
import {MessageBox} from './MessageBox.js';

ReactDOM.render(<Calculator screenValue={0}/>, document.getElementById("root"));

let message = { 'avatarChar': 'M',
    'messageSenderName': 'Muna Roy',
    'messageTime': '12:53 pm',
    'messageContent': '2+2=4'
};

let messages = [];
for( let i=0; i < 5; i++ ){
    messages.push( message );
}

//ReactDOM.render(<MessageBox messages={messages}/>, document.getElementById("root2"));
