import { useState } from 'react';
import Header from './components/Header'
import AddIngredientsBar from './components/AddIngredientsBar'
import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'
import RecipeResponse from './components/RecipeResponse'

import './css/App.css'
import { getRecipeFromChefClaude } from '../ai.js'
import loadingImage from './images/loading-79.gif'


function App() {

    let [ingredients, setIngredients] = useState(
        // ['bacon', 'eggs', 'cheese']
        []
    );
    let [recipeShown, setRecipeShown] = useState(false);
    let [recipeArticle, setRecipeArticle] = useState("(no recipe generated yet)");
    let [isThinking, setIsThinking] = useState(false);


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

        // Show the "Thinking..." message
        setIsThinking(true)

        // Scroll to the "Thinking..."
        setTimeout(() => {
            document.querySelector('.thinking-message').scrollIntoView({behavior: 'smooth'})
        }, 100)

        getRecipeFromChefClaude(ingredients).then((recipeText) => {

            setIsThinking(false);
            
            // Save the response
            setRecipeArticle(recipeText);

            setRecipeShown(true);

            // Scroll to the recipe
            setTimeout(() => {
                document.querySelector('.suggested-recipe-container').scrollIntoView({behavior: 'smooth'})
            }, 100)
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

        {isThinking && 
            <ThinkingMessage />
        }

        {recipeShown && 
            <RecipeResponse article={recipeArticle} />
        }

    </>
  )
}

function ThinkingMessage() {
    return (
        <p className="thinking-message-wrapper">
            <div>
                <img src={loadingImage} alt="Loading..." />
            </div>
            <div className="thinking-message">
                Thinking...
            </div>
        </p>
    );
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
