import { useState } from 'react';

import './css/App.css'
import Header from './components/Header'
import AddIngredientsBar from './components/AddIngredientsBar'
import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'


function App() {

    let [ingredients, setIngredients] = useState([]);

    let [recipeShown, setRecipeShown] = useState(false);

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
            <GenerateRecipeBar onClick={() => setRecipeShown(true)} /> 
        }


        {recipeShown && 
            <RecipeResponse />
        }

    </>
  )
}

function RecipeResponse() {
    return (
        <section>
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>
                <h3>Beef Bolognese Pasta</h3>
                <strong>Ingredients:</strong>
                <ul>
                    <li>1 lb. ground beef</li>
                    <li>1 onion, diced</li>
                    <li>3 cloves garlic, minced</li>
                    <li>2 tablespoons tomato paste</li>
                    <li>1 (28 oz) can crushed tomatoes</li>
                    <li>1 cup beef broth</li>
                    <li>1 teaspoon dried oregano</li>
                    <li>1 teaspoon dried basil</li>
                    <li>Salt and pepper to taste</li>
                    <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                </ul>
                <strong>Instructions:</strong>
                <ol>
                    <li>Bring a large pot of salted water to a boil for the pasta.</li>
                    <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                    <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                    <li>Stir in the tomato paste and cook for 1 minute.</li>
                    <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                    <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                    <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                    <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                    <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                </ol>
            </article>
        </section>
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
