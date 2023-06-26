import React from 'react';
import './App.css';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const Route = ({ path, component: Component }) => {
    const pathname = window.location.pathname;
    return pathname.match(path) ? <Component /> : null;
};

const Link = ({ to, children }) => {

    const onClick = (e) => {
        e.preventDefault();
        history.push(to);
    };

    return (
        <a href={to} onClick={onClick}>
          { children }
        </a>
    );
};

class App extends React.Component {

    componentDidMount() {
        history.listen(() => this.forceUpdate());
    }

    render() {   
        return (
            <>
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
                </ul>
                <hr/>

                <Route path='/atlantic' component={ Atlantic }/>
                <Route path='/pacific' component={ Pacific }/>
              </div>
            </>
        );
    }
}

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

export default App;
