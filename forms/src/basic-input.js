import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

class Input extends React.Component {
    static displayName = 'basic-input';

    state = {
        fields: {
          name: '',
          email: '',
        },
        people: []
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();
        const people = [...this.state.people, this.state.fields];
        this.setState((prevState, props) => ({
            people,
            fields: {
              name: '',
              email: ''
            }
        }));
    }

    onInputChange = (evt) => {
        const fields = Object.assign({}, this.state.fields);
        fields[evt.target.name] = evt.target.value;
        this.setState((prevState, props) => ({ fields }));
    }

    render() {
        return (
            <div>
              <h1>Sign Up Sheet</h1>
              <form onSubmit={this.onFormSubmit}>
                <input
                  placeholder='Name'
                  name='name'
                  value={this.state.fields.name}
                  onChange={this.onInputChange}
                />
                <input
                  placeholder='Email'
                  name='email'
                  value={this.state.fields.email}
                  onChange={this.onInputChange}
                />
                <input type="submit"/>
              </form>
              <div>
                <h3>Names</h3>
                <ul>
                  { this.state.people.map(({name, email}, i) => (
                      <li key={i}>
                          {name} ({email})
                      </li>
                  ))}
                </ul>
              </div>
            </div>
        );
    }
}

export default Input;
