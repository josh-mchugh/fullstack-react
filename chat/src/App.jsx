import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer } from './Reducers';
import ConversationTabs from './ConversationTabs';
import './App.css';

// ---- App
const store = createStore(reducer);

function App() {
  return (
      <>
        <Provider store={store}>
          <div className="ui container segment">
            <ConversationTabs />
            <Conversation />
          </div>
        </Provider>
      </>
  );
}

// ---- Converstation

function Conversation(props) {
    return (
        <div className="ui center aligned basic segment">
          <MessageList />
          <TextFieldSubmit />
        </div>
    );
}

function MessageList(props) {
    return (
        <div className="ui comments">
          <div className="comment">
            <div className="text">
              Example of message text
              <span className="metadata">@1234567890</span>
            </div>
          </div>
        </div>
    );
}

function TextFieldSubmit(props) {
    const [value, setValue] = useState('');

    return (
        <div className="ui input">
          <input type="text"/>
          <button className="ui primary button">
            Submit
          </button>
        </div>
    );
}

export default App;
