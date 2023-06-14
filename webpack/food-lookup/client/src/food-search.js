import React from 'react';
import Client from "./client";

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
    state = {
        showRemoveIcon: false
    };
    render() {
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
                          />
                          <i className="search icon"/>
                        </div>
                        {
                          this.state.showRemoveIcon
                             ? <i className="remove icon" />
                             : ''
                        }
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
        );
    }
}

export default FoodSearch;
