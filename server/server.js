const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Endpoint for recipe suggestions
app.post('/recipes', async (req, res) => {
  const ingredients = req.body.ingredients.join(',');

  try {
    const response = await axios.get('https://api.edamam.com/search', {
      params: {
        q: ingredients,
        app_id: process.env.EDAMAM_APP_ID,
        app_key: process.env.EDAMAM_APP_KEY,
        from: 0,
        to: 10,
        ingr: 5
      }
    });

    res.json(response.data.hits);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Endpoint for ingredient substitution
// app.get('/substitute', async (req, res) => {
//   const ingredient = req.query.ingredient;

//   try {
//     const response = await axios.get('https://api.spoonacular.com/food/ingredients/substitutes', {
//       params: {
//         ingredientName: ingredient,
//         apiKey: process.env.SPOONACULAR_API_KEY
//       }
//     });

//     res.json(response.data.substitutes);
//   } catch (error) {
//     console.error('Error fetching substitutes:', error);
//     res.status(500).json({ error: 'Failed to fetch substitutes' });
//   }
// });
