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
        people: [],
        _loading: false,
        _saveStatus: 'READY'
    };

    componentDidMount = () => {
        this.setState((prevState, props) => ({_loading: true }));
        apiClient.loadPeople().then(people => {
            this.setState((prevState, props) => ({_loading: false, people: people}));
        });
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        if(!this.validate()) {

            this.setState((prevState, props) => ({_saveStatus: 'SAVING'}));

            const person = this.state.fields;
            const people = [...this.state.people, person];

            apiClient.savePeople(people)
                .then(() => {
                    this.setState((prevState, props) => ({
                        people,
                        fields: {
                            name: '',
                            email: '',
                            department: '',
                            course: ''
                        },
                        _saveStatus: 'SUCCESS'
                    }));
                })
                .then(() => {
                    setTimeout(() => {
                        this.setState((prevState, props) => ({_saveStatus: 'READY'}));
                    }, 1000);
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ _saveStatus: 'ERROR' });
                });
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
        if(this.state._loading) {
            return <div>Loading...</div>
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
                    }[this.state._saveStatus]
                }
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

const apiClient = {
    loadPeople: function() {
        return {
            then: function(cb) {
                setTimeout(() => {
                    cb(JSON.parse(localStorage.people || '[]'));
                }, 1000);
            }
        };
    },
    savePeople: function(people) {
        const success = !!(this.count++ % 2);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(!success) {
                    return reject({success});
                }

                localStorage.people = JSON.stringify(people);
                return resolve({success});

            }, 1000); 
        });
    },
    count: 1
}

export default Input;
