'use strict';

function MessageLeft(props) {
    return (
        <div className="message-left">
            <div className="message-avatar">{props.avatarChar}</div>
        </div>
    );
}

function MessageRight(props) {
    return (
        <div className="message-right">
            <div className="message-header">
                <div className="message-name">{props.messageSenderName}</div>
                <div className="message-time">{props.messageTime}</div>
            </div>
            <div className="message-content">
                {props.messageContent}
            </div>
        </div>
    );
}

function Message(props) {
    return (
        <div className={"message " + props.parity}>
            <MessageLeft avatarChar={props.avatarChar} />
            <MessageRight messageSenderName={props.messageSenderName}
                messageTime={props.messageTime}
                messageContent={props.messageContent} />
        </div>
    );
}

function MessageBoxHeader(props) {
    return (
        <div className="message-box-header"> Messages </div>
    );
}

function MessageBoxMain(props) {
    let rows = props.messages.map((message, idx) => {
        let parity = idx % 2 == 0 ? 'even' : 'odd';
        return (<Message key={idx}
            avatarChar={message.avatarChar}
            messageSenderName={message.messageSenderName}
            messageTime={message.messageTime}
            messageContent={message.messageContent}
            parity={parity} />
        );
    });
    return (
        <div className="message-box-main"> {rows} </div>
    );
}

class MessageBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages: []
        };
    }
    render(){
        return (
            <div className="message-box">
                <MessageBoxHeader />
                <MessageBoxMain messages={this.state.messages} />
            </div>
        );
    }
    componentDidMount(){
        this.getMessages();
    }
    getMessages(){
        fetch( "../backend/getLast10Calculations.php" )
            .then( response => response.json() )
            .then( result => {
                if( result.error ){
                    console.log( "Error getting calculations" );
                }else{
                    let messages = result.calculations.map( calculationToMessage );
                    this.setState({
                        messages: messages
                    });
                }
            }).catch( reason => {
                console.log( reason );
            });
    }
}

function calculationToMessage( calculation ){
    let username = calculation[ 'Username' ];
    let time = new Date( calculation['Date'] );
    let content = calculation[ 'X' ] + ' ' + calculation[ 'Op'] + ' ' + calculation[ 'Y']; 
    let avatarChar = username[0].toUpperCase();
    let hours = time.getHours() % 12 + 1;
    let minutes = time.getMinutes();
    let partOfDay = time.getHours() >= 12 ? "pm" : "am";
    time = String( hours ) + ":" + String( minutes ) + " " + partOfDay; 
    return {
        messageSenderName: username,
        avatarChar: avatarChar,
        messageTime: time,
        messageContent: content
    };
}

export { MessageBox };
