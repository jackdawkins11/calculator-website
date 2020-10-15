'use strict';

function MessageLeft(props) {
    return (
        <div className="message-left">
            <div className="message-avatar-wrapper">
                <div className="message-avatar">{props.avatarChar}</div>
            </div>
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
        <div className="message">
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
    let rows = props.messages.map((message) => {
        return (<Message avatarChar={message.avatarChar}
            messageSenderName={message.messageSenderName}
            messageTime={message.messageTime}
            messageContent={message.messageContent} />
        );
    });
    return (
        <div className="message-box-main"> {rows} </div>
    );
}

function MessageBox( props ){
    return (
        <div className="message-box">
            <MessageBoxHeader />
            <MessageBoxMain messages={props.messages} />
        </div>
    );
}

export {MessageBox} ;
