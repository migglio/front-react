import React, { Component } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

class Chat extends Component {
  componentDidMount() {
    addResponseMessage("Falta limitar el chat solo entre viajeros!");
    addResponseMessage("Guardar conversacion en db!");
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  };

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Chat"
          subtitle="Parece un chat copado para lo que necesitamos"
          senderPlaceHolder="Escribe un mensaje"
          badge={3}
          autofocus={true}
        />
      </div>
    );
  }
}

export default Chat;
