import React from 'react';

const content = document.createElement('div');
document.body.append(content);

class Button extends React.Component {
    static displayName = '01-basic-button';

    onButtonClick = (evt) => {
        const btn = evt.target;
        console.log(`The user clicked ${btn.name}: ${btn.value}`);
    }

    render() {
        return (
            <div>
              <h1>What do you think of React?</h1>
              <button
                name='button-1'
                value='great'
                onClick={this.onButtonClick}
              >
                Great
              </button>
              <button
                name='button-2'
                value='amazing'
                onClick={this.onButtonClick}
              >
                Amazing
              </button>
            </div>
        );
    }
};

export default Button;
