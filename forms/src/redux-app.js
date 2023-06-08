import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './redux-reducer';
import { fetchPeople, savePeople } from './redux-actions';

import Form from './form';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        fields: state.person,
        people: state.people,
        saveStatus: state.saveStatus
    };
};

function mapDispatchToProps(dispatch) {
    return {
        onSubmit: (people) => {
            dispatch(savePeople(people));
        }
    };
};

const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form);

class App extends React.Component {
    static displayName = 'App';

    componentDidMount = () => {
        store.dispatch(fetchPeople());
    };

    render() {
        return (
            <Provider store={store}>
              <ReduxForm />
            </Provider>
        );
    }
}

export default App;
