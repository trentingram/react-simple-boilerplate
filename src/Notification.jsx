import React, {Component} from 'react';

const Notification = ({text}) => {

    return (
        <div className="message system">
          {text}
        </div>
    )
  }

  export default Notification;