import React from 'react';

const selectedFoods = (props) => {
    const tableRows = props.foods.map((food, idx) => tableRow(food, idx, props.onFoodClick(idx)));
    return (
        <table className="ui selectable structured large table">
          <thead>
            <tr>
              <th colSpan="5">
                <h3>Selected foods</h3>
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
          <tfoot>
            <tr>
              <th>Total</th>
              <th
                className="right aligned"
                id="total-kcal"
              >
                { sum(props.foods, "kcal") }
              </th>
              <th
                className="right aligned"
                id="total-protein_g"
              >
                { sum(props.foods, "protein_g") }
              </th>
              <th
                className="right aligned"
                id="total-fat_g"
              >
                { sum(props.foods, "fat_g") }
              </th>
              <th
                className="right aligned"
                id="total-carbohydrate_g"
              >
                { sum(props.foods, "carbohydrate_g") }
              </th>
            </tr>
          </tfoot>
        </table>
    );
};

const tableRow = (food, idx, onClick) => {
    return (
        <tr
          key={idx}
          onClick={() => onClick(idx)}
        >
          <td>{food.description}</td>
          <td className="right aligned">{food.kcal}</td>
          <td className="right aligned">{food.protein_g}</td>
          <td className="right aligned">{food.fat_g}</td>
          <td className="right aligned">{food.carbohydrate_g}</td>
        </tr>
    );
};

function sum(foods, prop) {
    return foods.reduce((memo, food) => (
        parseInt(food[prop], 10) + memo
   ), 0.0).toFixed(2);
}

export default selectedFoods;
