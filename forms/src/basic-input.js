import React from 'react';
import isEmail from 'validator/lib/isEmail';
import Field from "./field";
import CourseSelect from './course-select';

const content = document.createElement('div');
document.body.appendChild(content);

class Input extends React.Component {
    static displayName = 'basic-input';

    state = {
        fields: {
          name: '',
          email: '',
          course: '',
          department: ''
        },
        fieldErrors: {},
        people: []
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();

        if(!this.validate()) {
            const person = this.state.fields;
            const people = [...this.state.people, person];
            this.setState((prevState, props) => ({
                people,
                fields: {
                    name: '',
                    email: '',
                    department: '',
                    course: ''
                }
            }));
        }
    };

    onInputChange = (change) => {
        this.onInputChanges([change]);
    };

    onInputChanges = (changes) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);

        changes.forEach(({name, value, error}) => {
            fields[name] = value;
            fieldErrors[name] = error;  
        });

        this.setState((prevState, props) => ({ fields, fieldErrors }));
    };

    validate = () => {
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((name) => fieldErrors[name]);

        return !person.name
            || !person.email
            || !person.course
            || !person.department
            || errMessages.length;
    };

    render() {
        return (
            <div>
              <h1>Sign Up Sheet</h1>
              <form onSubmit={this.onFormSubmit}>
                <Field
                  placeholder="Name"
                  name="name"
                  value={this.state.fields.name}
                  onChange={this.onInputChange}
                  validate={val => (val ? false : 'Name Required')}
                />
                <br/>
                <Field
                  placeholder="Email"
                  name="email"
                  value={this.state.fields.email}
                  onChange={this.onInputChange}
                  validate={val => (isEmail(val) ? false : 'Invalid Email')}
                />
                <br/>
                <CourseSelect
                  department={this.state.fields.department}
                  course={this.state.fields.course}
                  onChanges={this.onInputChanges}
                />
                <br/>
                <input type="submit" disabled={this.validate()}/>
              </form>
              <div>
                <h3>Names</h3>
                <ul>
                  { this.state.people.map(({name, email, department, course}, i) => (
                      <li key={i}>
                          {[name, email, department, course].join(' - ')}
                      </li>
                  ))}
                </ul>
              </div>
            </div>
        );
    }
}

export default Input;
