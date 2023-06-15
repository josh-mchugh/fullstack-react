import React from 'react';
import './App.css';
import SelectedFoods from './selected-foods';
import FoodSearch from './food-search';

class App extends React.Component {

    state = {
        selectedFoods: []  
    };

    onSelectedFoodClick = (idx) => {
        this.setState((prevState, props) => ({
            selectedFoods: [
                ...this.state.selectedFoods.slice(0, idx),
                ...this.state.selectedFoods.slice(
                    idx + 1, this.state.selectedFoods.length
                )
            ]
        })); 
    };

    onSearchFoodClick = (food) => {
        this.setState((prevState, props) => ({
            selectedFood: this.state.selectedFoods.concat(food)
        }));
    };

    render() {
        return (
            <div className="App">
              <div className="ui text container">
                <SelectedFoods
                  foods={this.state.selectedFoods}
                  onFoodClick={this.onSelectedFoodClick}
                />
                <FoodSearch
                  onFoodClick={this.onSearchFoodClick}
                />
              </div>
            </div>
        );
    };
}

export default App;
