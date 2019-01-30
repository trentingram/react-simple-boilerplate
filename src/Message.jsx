import React, {Component} from 'react';

const Message = ({messageInfo}) => {
let color = {color: messageInfo.color};
    return (
      <li>
        <div className="message">
          <span style={color} className="message-username">{messageInfo.username}</span>
          <span className="message-content">{messageInfo.content}</span>
        </div>
      </li>
    )
  }

  export default Message;