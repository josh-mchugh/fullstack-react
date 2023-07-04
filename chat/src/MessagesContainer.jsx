import { useState } from 'react';

function MessagesContainer(props) {
    return (
        <div className="ui center aligned basic segment">
          <MessageList
            messages={props.conversation.messages}
            onClick={props.onMessageClick}
          />
          <TextFieldSubmit
            onSubmit={props.onMessageSubmit}
          />
        </div>
    );
}

function MessageList(props) {
    return (
        <div className="ui comments">
          {
              props.messages.map((message, index) => (
                  <div
                    key={index}
                    className="comment"
                    onClick={() => props.click(message.id)}
                  >
                    <div className="text">
                      {message.text}
                      <span className="metadata">@{message.timestamp}</span>
                    </div>
                  </div>
              ))
          }
        </div>
    );
}

function TextFieldSubmit(props) {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        props.onSubmit(value);
        setValue('');
    };

    return (
        <div className="ui input">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button
            className="ui primary button"
            type='submit'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
    );
}

export default MessagesContainer;
