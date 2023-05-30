import React from 'react';
import isEmail from 'validator/lib/isEmail';

const content = document.createElement('div');
document.body.appendChild(content);

class Input extends React.Component {
    static displayName = 'basic-input';

    state = {
        fields: {
          name: '',
          email: '',
        },
        fieldErrors: {},
        people: []
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();
        const person = this.state.fields;
        const fieldErrors = this.validate(person);

        if(Object.keys(fieldErrors).length) {
            this.setState((prevState, props) => ({ fieldErrors }));
            return;
        }

        const people = [...this.state.people, person];

        this.setState((prevState, props) => ({
            people,
            fields: {
              name: '',
              email: ''
            },
            fieldErrors: [],
        }));
    }

    onInputChange = (evt) => {
        const fields = Object.assign({}, this.state.fields);
        fields[evt.target.name] = evt.target.value;
        this.setState((prevState, props) => ({ fields }));
    }

    validate = person => {
        const errors = {};
        if(!person.name) {
            errors.name = 'Name Required';
        }
        if(!person.email) {
            errors.email = 'Email Required';
        }
        if(person.email && !isEmail(person.email)) {
            errors.email = 'Invalid Email';
        }
        return errors;
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
                <span style={{color: 'red'}}>{this.state.fieldErrors.name}</span>
                <br/>
                <input
                  placeholder='Email'
                  name='email'
                  value={this.state.fields.email}
                  onChange={this.onInputChange}
                />
                <span style={{color: 'red'}}>{this.state.fieldErrors.email}</span>
                <br/>
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
