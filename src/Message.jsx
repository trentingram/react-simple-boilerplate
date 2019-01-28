import React, {Component} from 'react';

const Message = ({messageInfo}) => {

    return (
      <li>
        <div className="message">
          <span className="message-username">{messageInfo.username}</span>
          <span className="message-content">{messageInfo.content}</span>
        </div>
        <div className="message system">
          Anonymrous1 cddhanged their name to nomnom.
        </div>
      </li>
    )
  }

  export default Message;