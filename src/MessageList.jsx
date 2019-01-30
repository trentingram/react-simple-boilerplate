import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

const MessageList = ({messages}) => {
  
    const allMessages = messages.map((info) => {

      console.log(info.type)
      if(info.type === 'incomingMessage') {
        return  (<Message key={info.uuid} messageInfo={info} />)
      } else
      if(info.type === 'incomingNotice') {
        return (<Notification key={info.uuid} text={info.content}/>)
      } 
    })
    return (
      <main className="messages">
        <ul>{allMessages}</ul>
      </main>
    )
  }

  export default MessageList;