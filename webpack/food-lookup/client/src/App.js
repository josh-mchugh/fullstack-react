import React from 'react';
import './App.css';
import SelectedFoods from './selected-foods';
import FoodSearch from './food-search';

class App extends React.Component {
    state = {
        selectedFoods: []  
    };
    render() {
        return (
            <div className="App">
              <div className="ui text container">
                <SelectedFoods />
                <FoodSearch />
              </div>
            </div>
        );
    };
}

export default App;
