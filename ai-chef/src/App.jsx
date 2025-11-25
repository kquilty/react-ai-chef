import { useState } from 'react';

import './css/App.css'
import Header from './components/Header'
import AddIngredientsBar from './components/AddIngredientsBar'
import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'
import RecipeResponse from './components/RecipeResponse'

import { getRecipeFromChefClaude } from '../ai.js'


function App() {

    let [ingredients, setIngredients] = useState([]);
    let [recipeShown, setRecipeShown] = useState(false);
    let [recipeArticle, setRecipeArticle] = useState("(no recipe generated yet)");


    function handleSubmit(formData) {
        const newIngredient = formData.get('ingredient');

        // Add the new ingredient
        setIngredients(function(prevIngredients) {
            let newIngredientsList = [...prevIngredients];
            newIngredientsList.push(newIngredient);

            //...and sort it
            // newIngredientsList.sort();

            return newIngredientsList;
        });
    }

    const MIN_INGREDIENTS_FOR_RECIPE = 3;

    function handleGenerateRecipeClick() {
        setRecipeShown(true)

        setRecipeArticle("Thinking...");
        getRecipeFromChefClaude(ingredients).then((recipeText) => {

            // Save the response
            setRecipeArticle(recipeText);
            
        });
    }

    return (
    <>
        <Header />

        <AddIngredientsBar 
            handleSubmit={handleSubmit} 
            random_ingredient={ getRandomSampleIngredient() }
        />

        {ingredients.length > 0 && 
            <IngredientsList ingredients={ingredients} />
        }


        {/* "Add 3 more ingredients..." */}
        <AddMoreIngredientsMessage 
            ingredients={ingredients} 
            MIN_INGREDIENTS_FOR_RECIPE={MIN_INGREDIENTS_FOR_RECIPE} 
        />


        {ingredients.length >= MIN_INGREDIENTS_FOR_RECIPE &&
            <GenerateRecipeBar onClick={handleGenerateRecipeClick} /> 
        }


        {recipeShown && 
            <RecipeResponse article={recipeArticle} />
        }

    </>
  )
}

function AddMoreIngredientsMessage({ ingredients, MIN_INGREDIENTS_FOR_RECIPE }) {
    let add_more_ingredients_message = null;
    if (ingredients.length < MIN_INGREDIENTS_FOR_RECIPE) {
        if(ingredients.length === 0) {
            return (
                <p className="add-more-ingredients-message">
                    Add at least <b>{MIN_INGREDIENTS_FOR_RECIPE} ingredients</b> to enable recipe generation.
                </p>
            );
        } else {
            const ingredients_needed = MIN_INGREDIENTS_FOR_RECIPE - ingredients.length;
            return (
                <p className="add-more-ingredients-message-light">
                    (add <b>{ingredients_needed} more</b> ingredient{ingredients_needed > 1 ? 's' : ''})
                </p>
            );
        }
    }
    return add_more_ingredients_message;
}

function getRandomSampleIngredient() {
    const sample_ingredients = [
        "chicken", "beef", "pork", "tofu", "mushrooms", "onions", "garlic", 
        "tomatoes", "bell peppers", "carrots", "broccoli", "spinach", "rice", 
        "pasta", "cheese", "eggs", "milk", "butter", "potatoes", "beans"];

    const randomIndex = Math.floor(Math.random() * sample_ingredients.length);
    return sample_ingredients[randomIndex];
}

export default App
