import React, {Component} from 'react';

function ChatBar({user}) {

  return (
    <footer className="chatbar">
      <input className="chatbar-username" value={user} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  )
} 

function MessageList({messages}) {
  
  const allMessages = messages.map((info, index) => {
    return (<Messages key={index} messageInfo={info}/>)
  })
  return (
    <main className="messages">
      <ul>{allMessages}</ul>
    </main>
  )
}

function Messages({messageInfo}) {

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

class App extends Component {

  constructor(props){
    super(props)
      this.state = {

        currentUser: {
          name: "Bob"
        },
        messages: [{
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }
    }

    render() {
      
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar user={this.state.currentUser.name} />
        </div>
      );
    }
  }


export default App;
