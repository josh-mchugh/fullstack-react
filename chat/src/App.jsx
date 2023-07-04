import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Reducers';
import ConversationTabs from './ConversationTabs';
import ConversationMessages from './ConversationMessages';
import './App.css';

const store = createStore(reducer);

function App() {
  return (
      <>
        <Provider store={store}>
          <div className="ui container segment">
            <ConversationTabs />
            <ConversationMessages />
          </div>
        </Provider>
      </>
  );
}

export default App;
