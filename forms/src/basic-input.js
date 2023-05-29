import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

class Input extends React.Component {
    static displayName = 'basic-input';

    state = {
        name: '',
        names: []
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();
        const names = [...this.state.names, this.state.name];
        this.setState((prevState, props) => ({
                name: '',
                names: names
        }));
    }

    onNameChange = (evt) => {
        this.setState((prevState, props) => ({
            name: evt.target.value
        }));
    }

    render() {
        return (
            <div>
              <h1>Sign Up Sheet</h1>
              <form onSubmit={this.onFormSubmit}>
                <input
                  placeholder='Name'
                  value={this.state.name}
                  onChange={this.onNameChange}
                />
                <input type="submit"/>
              </form>
              <div>
                <h3>Names</h3>
                <ul>
                  { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
                </ul>
              </div>
            </div>
        );
    }
}

export default Input;
