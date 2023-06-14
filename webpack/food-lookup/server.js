const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

const db = new sqlite.Database(filebuffer);

const app = express();

app.set('port', (process.env.API_PORT || 3001));

const COLUMNS = [
    'carbohydrate_g',
    'protein_g',
    'fa_sat_g',
    'fa_mono_g',
    'fa_poly_g',
    'kcal',
    'description'
];

app.get('/api/food', (req, res) => {
    const param = req.query.q;

    if(!param) {
        res.json({
            error: "Missing required parameter 'q'"
        });
        return;
    }

    const results = db.exec(`
      select ${COLUMNS.join(', ')}
      from entries
      where description like '%${param}%'
      limit 100
    `);

    if(!results[0]) {
        res.json([]);
    }

    res.json(
        results[0].values.map((entry) => {
            const food = {};
            COLUMNS.forEach((column, idx) => {
                if(column.match(/^fa_/)) {
                    food.fat_g = food.fat_g || 0.0;
                    food.fat_g = parseFloat((
                        parseFloat()
                    ).toFixed(2), 10);
                }
            });
            return food;
        });
    );
});
