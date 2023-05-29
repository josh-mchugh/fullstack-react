import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

class Input extends React.Component {
    static displayName = 'basic-input';

    state = {
        names: []
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();
        const name = this.refs.name.value;
        const names = [...this.state.names, name];
        this.setState((prevState, props) => ({ names: names }) ) ;
        this.refs.name.value = '';
    }

    render() {
        return (
            <div>
              <h1>Sign Up Sheet</h1>
              <form onSubmit={this.onFormSubmit}>
                <input
                  placeholder='Name'
                  ref='name'
                />
                <input type="submit"/>
              </form>
              <div>
                <h3>Names</h3>
                <ul>
                  { this.state.names.map((name, i) => <li key={i}>{name}</li>)}
                </ul>
              </div>
            </div>
        );
    }
}

export default Input;
