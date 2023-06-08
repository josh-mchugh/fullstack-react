import React from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import Field from "./field";
import CourseSelect from './course-select';

class Form extends React.Component {

    static propTypes = {
        people: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        saveStatus: PropTypes.string.isRequired,
        fields: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    };

    state = {
        fields: this.props.fields || {
          name: '',
          email: '',
          course: null,
          department: null
        },
        fieldErrors: {}
    };

    onFormSubmit = (evt) => {
        evt.preventDefault();
        if(!this.validate()) {
            const person = this.state.fields;
            this.props.onSubmit([...this.props.people, person]);
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
        const errMessages = Object.keys(fieldErrors)
              .filter((name) => fieldErrors[name]);

        return !person.name
            || !person.email
            || !person.course
            || !person.department
            || errMessages.length;
    };

    render() {
        if(this.props._loading) {
            return <div>Loading...</div>
        }

        const dirty = Object.keys(this.state.fields).length;
        let status = this.props.saveStatus;
        if(status === 'SUCCESS' && dirty) {
            status = 'READY';
        }

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
                {
                    {
                        SAVING: <input value="Saving..." type="submit" disabled />,
                        SUCCESS: <input  value="Saved!" typed="submit" disabled />,
                        ERROR: (
                                <input
                                  value="Save Failed - Retry?"
                                  type="submit"
                                  disabled={this.validate()}
                                />
                            ),
                        READY: (
                                <input
                                  value="Submit"
                                  type="submit"
                                  disabled={this.validate()}
                                />
                        )
                    }[status]
                }
              </form>
              <div>
                <h3>Names</h3>
                <ul>
                  { this.props.people.map(({name, email, department, course}, i) => (
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

export default Form;
