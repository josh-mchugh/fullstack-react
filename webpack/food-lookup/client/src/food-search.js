import React from 'react';
import Client from "./client";

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
    state = {
        foods: [],
        showRemoveIcon: false,
        searchValue: ''
    };

    handleSearchChange = (e) => {
        const value = e.target.value;
        const foods = value === '' ? [] : this.state.foods;
        this.setState((prevState, props) => ({
            searchValue: value,
            showRemoveIcon: value !== '',
            foods: foods
        }));

        Client.search(value, (foods) => {
            this.setState((prevState, props) => ({
                foods: foods.slice(0, MATCHING_ITEM_LIMIT)
            }));
        });
    };

    handleSearchCancel = () => {
        this.setState((prevState, props) => ({
            foods: [],
            showRemoveIcon: false,
            searchValue: ''
        }));
    };

    renderRemoveIcon = () => {
        return this.state.showRemoveIcon
            ? <i
                className="remove icon"
                onClick={this.handleSearchCancel}
              />
            : '';
    };

    renderTableRow = (food, idx) => {
        return (
            <tr
              key={idx}
              onClick={() => this.props.onFoodClick(food)}
            >
              <td>{food.description}</td>
              <td className="right aligned">{food.kcal}</td>
              <td className="right aligned">{food.protein_g}</td>
              <td className="right aligned">{food.fat_g}</td>
              <td className="right aligned">{food.carbohydrate_g}</td>
            </tr>
        );
    };
    
    render() {
        const tableRows = this.state.foods.map((food, idx) => this.renderTableRow(food, idx));
        return (
            <div id="food-search">
              <table className="ui selectable structured large table">
                <thead>
                  <tr>
                    <th colSpan="5">
                      <div className="ui fluid search">
                        <div className="ui icon input">
                          <input
                            className="promp"
                            type="text"
                            placeholder="Search Food"
                            value={this.state.searchValue}
                            onChange={this.handleSearchChange}
                          />
                          <i className="search icon"/>
                        </div>
                        { this.renderRemoveIcon() }
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="eight wide">Description</th>
                    <th>Kcal</th>
                    <th>Protein (g)</th>
                    <th>Fat (g)</th>
                    <th>Carbs (g)</th>
                  </tr>
                </thead>
                <tbody>
                  { tableRows }
                </tbody>
              </table>
            </div>
        );
    }
}

export default FoodSearch;
