import { useState, useEffect } from 'react';
import Header from './components/Header'
import AddIngredientsBar from './components/AddIngredientsBar'
import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'
import RecipeResponse from './components/RecipeResponse'

import './css/App.css'
import { getRecipeFromChefClaude } from '../ai.js'
import loadingImage from './images/loading-79.gif'


function App() {
    const MIN_INGREDIENTS_FOR_RECIPE = 3;

    let [ingredients, setIngredients] = useState(
        // ['bacon', 'eggs', 'cheddar cheese and some other cheeses too', 'spinach', 'mushrooms', 'onions', 'bell peppers']
        []
    );
    let [recipeShown, setRecipeShown] = useState(false);
    let [recipeArticle, setRecipeArticle] = useState("(no recipe generated yet)");
    let [isThinking, setIsThinking] = useState(false);

    // On load, focus the input box
    useEffect(() => {
        document.querySelector('#ingredient').focus();
    }, []);

    // When thinking starts, scroll to the thinking message
    useEffect(() => {
        if (isThinking) {
            document.querySelector('.thinking-message').scrollIntoView({behavior: 'smooth'})
        }
    }, [isThinking]);

    // When the recipe is shown, scroll to the recipe
    useEffect(() => {
        if (recipeShown) {
            document.querySelector('.suggested-recipe-container').scrollIntoView({behavior: 'smooth'})
        }
    }, [recipeShown]);

    function onSubmitNewIngredient(formData) {
        const newIngredient = formData.get('ingredient');

        // Ignore empty or duplicate ingredients
        if (!newIngredient) {
            return;
        }
        const prevIngredients = ingredients.map(ing => ing.toLowerCase());
        if(prevIngredients.includes(newIngredient.toLowerCase())) {
            alert(`${newIngredient} has already been added.`);
            return;
        }

        // Add the new ingredient
        setIngredients(function(prevIngredients) {
            let newIngredientsList = [...prevIngredients];
            newIngredientsList.push(newIngredient);
            return newIngredientsList;
        });
    }

    function onClearIngredientsClick() {
        setIngredients([]);
        setRecipeShown(false);
        setRecipeArticle("(no recipe generated yet)");
        document.querySelector('#ingredient').focus();
    }

    function onGetRecipeClick() {

        // Show the "Thinking..." message
        setIsThinking(true);

        // Call the AI to get a recipe
        getRecipeFromChefClaude(ingredients).then((recipeText) => {

            // Save the response
            setRecipeArticle(recipeText);

            // Hide the "Thinking..." message
            setIsThinking(false);

            // Show the recipe
            setRecipeShown(true);
        });
    }

    return (
    <>
        <Header />

        <div className='main-content'>
            {/*
                [_______________________] [Add Ingredient] 
            */}
            <AddIngredientsBar 
                onSubmit={onSubmitNewIngredient} 
                random_ingredient={ getRandomSampleIngredient() }
            />


            {/* 
                -----------------
                |  Ingredients  |
                -----------------
                |  Lettuce      |
                |  Tomatoes     |
                |  Bacon        |
                |  Bread        |
                -----------------
            */}
            {ingredients.length > 0 && 
                <IngredientsList 
                    ingredients={ingredients} 
                    onClearIngredientsClick={() => onClearIngredientsClick()}
                    />
            }


            {/* 
                "(add 3 more ingredients)" 
            */}
            <AddMoreIngredientsMessage 
                ingredients={ingredients} 
                MIN_INGREDIENTS_FOR_RECIPE={MIN_INGREDIENTS_FOR_RECIPE} 
            />


            {/* 
                Are you ready for a recipe?
                [ Get a recipe ]
            */}
            {ingredients.length >= MIN_INGREDIENTS_FOR_RECIPE &&
                <GenerateRecipeBar 
                    onGetRecipeClick={onGetRecipeClick} 
                    isDisabled={ingredients.length < MIN_INGREDIENTS_FOR_RECIPE || isThinking}
                />
            }


            {/* 
                [ Thinking... ]
            */}
            {isThinking && 
                <ThinkingMessage />
            }


            {/* 
                [ Suggested recipe ]
                Make a BLT Sandwich
                Ingredients:
                - Lettuce
                - Tomatoes
                - Bacon
                ...
            */}
            {recipeShown && 
                <RecipeResponse article={recipeArticle} />
            }

        </div>
    </>
  )
}

function ThinkingMessage() {
    return (
        <p className="thinking-message-wrapper">
            <div>
                <img src={loadingImage} height="200px" alt="Loading..." />
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
