import React, {Component} from 'react';

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