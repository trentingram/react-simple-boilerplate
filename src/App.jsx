import React, {Component} from 'react';

function ChatBar({user, addMessage}) {

const handleEnter = (e) => {
  if(e.keyCode === 13) {
    const newText = e.target.value
    addMessage(newText)
    e.target.value = "";
  }
}

  return (
    <footer  className="chatbar">
      <input className="chatbar-username" value={user} placeholder="Your Name (Optional)" />
      <input  type="text" onKeyDown={handleEnter} className="chatbar-message" name="newMessage" placeholder="Type a message and hit ENTER" />
    </footer>
  )
} 

function MessageList({messages}) {
  
  const allMessages = messages.map((info, index) => {
    
    return (<Message key={info.id} messageInfo={info}/>)
  })
  return (
    <main className="messages">
      <ul>{allMessages}</ul>
    </main>
  )
}

function Message({messageInfo}) {

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

    state = {

      currentUser: {
        name: "Bob"
      },
      messages: [{
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
      }
      
    randomNumber() {
      return Math.floor((Math.random() * 100) + 1);
    }

    componentDidMount() {

      // establish Websocket Connection
      let socket = new WebSocket('ws://localhost:3001')
      socket.onopen = () => {
      console.log('Connected to server.');
      }
      
      setTimeout(() => {
        console.log("Simulating incoming message");
        // Add a new message to the list of messages in the data store
        const newMessage = {id: this.randomNumber(), username: "Michelle", content: "Hello there!"};
        const messages = this.state.messages.concat(newMessage)
        // Update the state of the app component.
        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({messages: messages})
      }, 3000);
    }
    
    addMessage = (text) => {

      const newMessage = {
        username: this.state.currentUser.name, 
        content: text,
        id: this.randomNumber()
      };
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      
    }

    render() {
      
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} />
        </div>
      );
    }
  }


export default App;
