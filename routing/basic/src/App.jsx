import PropTypes from 'prop-types';
import React from 'react';
import { createBrowserHistory } from 'history';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
} from 'react-router-dom';

const App = () => {
    return (
        <>
          <Router>
            <div className="ui text container">
              <h2 className="ui dividing header">
                Which body of water?
              </h2>
              <ul>
                <li>
                  <Link to="/atlantic">
                    <code>/atlantic</code>
                  </Link>
                </li>
                <li>
                  <Link to="/pacific">
                    <code>/pacific</code>
                  </Link>
                </li>
                <li>
                  <Link to='/black-sea'>
                    <code>/black-sea</code>
                  </Link>
                </li>
              </ul>
              <hr/>
              <Routes>
                <Route path='/atlantic' element={ <Atlantic/> }/>
                <Route path='/pacific' element={ <Pacific/> }/>
                <Route path='/black-sea' element={ <BlackSea/> }/>
                <Route path='/' element={ <Welcome />}/>
              </Routes>
            </div>
          </Router>
        </>
    );
};

const Welcome = () => (
    <>
      <h3>Welcome! Select a body of saline water above.</h3>      
    </>
);

const Atlantic = () => (
    <div>
      <h3>Atlantic Ocean</h3>
      <p>
        The Atlantic Ocean covers approximately 1/5th of the surface of the earth.
      </p>
    </div>
);

const Pacific = () => (
    <div>
      <h3>Pacific Ocean</h3>
      <p>
        Ferdinand Magellan, a Portuguese explorer, named the ocean 'mar pacifico' in 1521, which means peaceful sea.
      </p>
    </div>
);

class BlackSea extends React.Component {
    state = {
        counter: 3
    };

    componentDidMount() {
        this.interval = setInterval(() => (
            this.setState((prevState, props) => ({
                counter: prevState.counter - 1
            }))
        ), 1000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderRedirect = () => {
        return this.state.counter < 1
            ? <Navigate to='/' />
            : null;
    }

    render() {
        return (
            <div>
              <h3>Black Sea</h3>
              <p>Nothing to sea [sic] here...</p>
              <p>Redirect in {this.state.counter}...</p>
              { this.renderRedirect() }
            </div>
        );
    }
}

export default App;
