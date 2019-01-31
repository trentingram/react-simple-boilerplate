import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  // set up new WebSocket instance
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
      // some dummy messages
      // {
      //   type: 'incomingMessage',
      //   username: "Bob",
      //   content: "Has anyone seen my marbles?",
      //   id: 1
      // },
      // { 
      //   type: 'incomingNotice',
      //   username: "Anonymous",
      //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      //   id: 2
      // }
     ]
    }

  componentDidMount() {

    // attaches socket onmessage handler to onMessage method of class  
    this.socket.onmessage = this.onMessage;

    // logs when socket opens
    this.socket.onopen = (ws) => {
    console.log('Connected to server.');
    }
    
    // *** function below is an example of a async data fetch
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {type: 'message', id: 25, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  // send message text and user to server for processing
  addMessage = (text, user) => {
    
    const newMessage = {
      type: 'postMessage',
      username: user,
      content: text
    };
    this.socket.send(JSON.stringify(newMessage))
  }

  // handles all incoming messages from server according to type
  // then updates state
  onMessage = (payload) => {
    
    let parsedPayload = JSON.parse(payload.data)
    if(parsedPayload.type === 'incomingMessage'){
      
      let concatMessage = this.state.messages.concat(parsedPayload)
      this.setState({messages: concatMessage})
    } else

    if(parsedPayload.type === 'client'){
      this.setState({userNumber: parsedPayload.clients})
    } else

    if(parsedPayload.type === 'incomingNotice') {
      let concatMessage = this.state.messages.concat(parsedPayload)
      this.setState({
        messages: concatMessage
      })
    }
  }

  // captures current currentUser in state
  // updates state with new currentUser name
  // sends message and user to server for processing
  updateUsername = (username) => {
    let oldName = this.state.currentUser.name;
    this.setState({currentUser: { name: username }})
    let newNotice = {
      type: 'postNotice',
      username: username,
      content: `${oldName} just updated their name to ${username}.`
    }
    this.socket.send(JSON.stringify(newNotice))
  }

  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChatterBox</a>
          <div className="navbar-users">{this.state.userText()}</div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} updateUsername={this.updateUsername} />
      </div>
    );
  }
}

export default App;
