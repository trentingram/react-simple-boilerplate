import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = ({messages}) => {
  
    const allMessages = messages.map((info, index) => {
      
      return (<Message key={info.id} messageInfo={info}/>)
    })
    return (
      <main className="messages">
        <ul>{allMessages}</ul>
      </main>
    )
  }

  export default MessageList;