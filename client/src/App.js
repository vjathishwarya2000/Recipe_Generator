import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/recipes', {
        ingredients: ingredients.split(',').map(item => item.trim())
      });
      setRecipes(response.data);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Interactive Recipe Ingredient Substitutor</h1>
      </header>

      <div className="input-container">
        <h2>Enter Ingredients</h2>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., chicken, garlic, tomatoes"
          className="input-field"
        />
        <button onClick={fetchRecipes} className="submit-button">
          Find Recipes
        </button>
      </div>

      <div className="recipes-container">
        <h2>Recipe Suggestions</h2>
        {loading ? (
          <div className="loader"></div>
        ) : recipes.length > 0 ? (
          <ul className="recipe-list">
            {recipes.map((recipe, index) => (
              <li key={index} className="recipe-item">
                <img src={recipe.recipe.image} alt={recipe.recipe.label} className="recipe-image"/>
                <div className="recipe-details">
                  <h3>{recipe.recipe.label}</h3>
                  <p>Ingredients: {recipe.recipe.ingredientLines.join(', ')}</p>
                  <p>Calories: {Math.round(recipe.recipe.calories)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
