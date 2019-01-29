import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  socket = new WebSocket("ws://localhost:3001");
  state = {

    userNumber: 1,

    userText: function() {
    return `${this.userNumber} user` + (this.userNumber > 1 ? "s" : "") + " online..."
    },
    currentUser: {
      name: "Anonymous"
    },
    messages: [
      {
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

  componentDidMount() {
    this.socket.onmessage = this.onMessage;
    // once connected, console.log
    this.socket.onopen = () => {
    console.log('Connected to server.');
    }
    
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 25, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage = (text, user) => {
    
    const newMessage = {
      type: 'message',
      username: user,
      content: text
    };

    this.socket.send(JSON.stringify(newMessage))
  }

  onMessage = (payload) => {
    let parsedPayload = JSON.parse(payload.data)
    console.log(parsedPayload.type)
    if(parsedPayload.type === 'message'){
      let newState = this.state.messages.concat(parsedPayload)
      this.setState({messages: newState})
    }

    if(parsedPayload.type === 'client'){
      console.log('update usernumber on state.')
    }

  }

  updateUsername = (username) => {
    let newUsernameState = { name: username }
    this.setState({currentUser: newUsernameState})
  }

  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-users">{this.state.userText()}</div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} updateUsername={this.updateUsername} />
      </div>
    );
  }
}

export default App;
