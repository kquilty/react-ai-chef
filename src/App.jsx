import { useState, useEffect, useRef } from 'react';
import Header from './components/Header'
import AddIngredientsBar from './components/AddIngredientsBar'
import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'
import RecipeResponse from './components/RecipeResponse'

import './css/App.css'
import './css/typing-effect.css'
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

    let refThinkingMessageText = useRef(null);
    let refSuggestedRecipeContainer = useRef(null);

    // On load, focus the input box
    useEffect(() => {
        document.querySelector('#ingredient').focus();


        // show messages one at a time.
        setTimeout(() => {
            // message 1 will start automatically from the css (after 1 second)

            // show message 2 for 4 seconds
            document.querySelector('.anim-typewriter').style.display = 'none';
            document.querySelector('.anim-typewriter2').style.display = 'block';
            
            // show message 3 after 6 seconds
            setTimeout(() => {
                document.querySelector('.anim-typewriter2').style.display = 'none';
                document.querySelector('.anim-typewriter3').style.display = 'block';
            }, 6000);
            
        }, 4000);
    }, []);

    // When thinking starts, scroll to the thinking message
    useEffect(() => {
        if (isThinking) {
            refThinkingMessageText.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [isThinking]);

    // When the recipe is shown, scroll to the recipe
    useEffect(() => {
        if (recipeShown) {
            refSuggestedRecipeContainer.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [recipeShown]);

    function onSubmitNewIngredient(formData) {
        const newIngredientCSV = formData.get('ingredient').trim();

        // Ignore empty or duplicate ingredients
        if (!newIngredientCSV) {
            return;
        }

        // Support multiple ingredients separated by commas
        const newIngredientsArray = newIngredientCSV.split(',');
        for (let i = 0; i < newIngredientsArray.length; i++) {

            const singleIngredient = newIngredientsArray[i].trim();

            const prevIngredientsLowered = ingredients.map(ing => ing.toLowerCase());
            if(prevIngredientsLowered.includes(singleIngredient.toLowerCase())) {
                alert(`${singleIngredient} has already been added.`);
                continue;
            }

            // Add the new ingredient(s)
            setIngredients(function(prevIngredients) {
                let newIngredientsList = [...prevIngredients];

                newIngredientsList.push(singleIngredient);

                return newIngredientsList;
            });
        }
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


        <br />
        <br />
        <p class="line-1 anim-typewriter">Hi there!</p>
        <p class="line-1 anim-typewriter2" style={{display: 'none'}}>Let me suggest a recipe for you.</p>
        <p class="line-1 anim-typewriter3" style={{display: 'none'}}>What ingredients do you have on hand?</p>


        <div className='main-content'>
            {/*
                [_______________________] [+ Add Ingredient] 
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
                <ThinkingMessage 
                    refThinkingMessageText={refThinkingMessageText} />
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
                <RecipeResponse 
                    article={recipeArticle} 
                    ref={refSuggestedRecipeContainer} />
            }

        </div>
    </>
  )
}

function ThinkingMessage({refThinkingMessageText}) {
    return (
        <p className="thinking-message-wrapper">
            <div>
                <img src={loadingImage} height="200px" alt="Loading..." />
            </div>
            <div ref={refThinkingMessageText} className="thinking-message">
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
                    (add at least <b>{MIN_INGREDIENTS_FOR_RECIPE} ingredients</b> to get started)
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
    // const sample_ingredients = [
    //     "chicken, broccoli, rice", 
    //     "beef, eggs, milk", 
    //     "pork, spinach, cheese", 
    //     "tofu, mushrooms, carrots", 
    //     "garlic, onions, tomatoes", 
    //     "bell peppers", 
    //     "pasta, cheese, butter", 
    //     "potatoes, beans"];
    //
    // Instead of grouping like this ^
    // show each suggestion individually
    const sample_ingredients = [
        "chicken", "broccoli", "rice", 
        "beef", "eggs", "milk", 
        "pork", "spinach", "cheese", 
        "tofu", "mushrooms", "carrots", 
        "garlic", "onions", "tomatoes", 
        "bell peppers", 
        "pasta", "cheese", "butter", 
        "potatoes", "beans"];

    const randomIndex = Math.floor(Math.random() * sample_ingredients.length);
    return sample_ingredients[randomIndex];
}

export default App
