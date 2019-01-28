import React, {Component} from 'react';

const ChatBar = ({user, addMessage, updateUsername}) => {

    const handleUsername = (e) => {
      if(e.keyCode === 13) {
        const newUsername = e.target.value
        updateUsername(newUsername)
     }
    }
    
    const handleMessage = (e) => {
      if(e.keyCode === 13) {
        const newText = e.target.value
        addMessage(newText, user)
        e.target.value = "";
      }
    }
    
      return (
        <footer  className="chatbar">
          <input type="text" onKeyDown={handleUsername} className="chatbar-username" name="username" placeholder="Your Name (Optional)" />
          <input  type="text" onKeyDown={handleMessage} className="chatbar-message" name="newMessage" placeholder="Type a message and hit ENTER" />
        </footer>
      )
    } 

export default ChatBar;