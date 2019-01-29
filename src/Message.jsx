import React, {Component} from 'react';

const Message = ({messageInfo}) => {

    return (
      <li>
        <div className="message">
          <span className="message-username">{messageInfo.username}</span>
          <span className="message-content">{messageInfo.content}</span>
        </div>
      </li>
    )
  }

  export default Message;