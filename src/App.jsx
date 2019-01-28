import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

class App extends Component {

    socket = new WebSocket("ws://localhost:3001");

    state = {
      
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
        username: user,
        content: text
      };
      
      this.socket.send(JSON.stringify(newMessage))

      this.socket.onmessage = (message) => {
        let messageToAdd = JSON.parse(message.data)
        let allMessages = this.state.messages.concat(messageToAdd)
        this.setState({messages: allMessages})
      }
    }

    updateUsername = (username) => {
      console.log('ready to update state with: ', typeof username)
      let newUsernameState = { name: username }
      this.setState({currentUser: newUsernameState})
      console.log(this.state)
    }

    render() {
      
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} updateUsername={this.updateUsername} />
        </div>
      );
    }
  }

export default App;
