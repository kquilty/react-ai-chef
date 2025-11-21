import { useState } from 'react';

import './css/App.css'
import Header from './components/Header'
// import AddIngredientsBar from './components/AddIngredientsBar'
// import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'


function App() {

    let [ingredients, setIngredients] = useState([]);




    function handleSubmit(formData) {
        const newIngredient = formData.get('ingredient');

        // Add the new ingredient
        setIngredients(function(prevIngredients) {
            let newIngredientsList = [...prevIngredients];
            newIngredientsList.push(newIngredient);

            //...and sort it
            newIngredientsList.sort();

            return newIngredientsList;
        });
    }

    const random_ingredient = getRandomSampleIngredient()
    const MIN_INGREDIENTS_FOR_RECIPE = 3;

    return (
    <>
        <Header />

        {/* <AddIngredientsBar /> */}
        <div>
            <form className="add-ingredient-form" action={handleSubmit}>
                <input 
                    type="text" 
                    name="ingredient"
                    id="ingredient"
                    placeholder={`e.g. ${random_ingredient}`} 
                    autocomplete="off"
                />
                <button>Add Ingredient</button>
            </form>
        </div>






        {ingredients.length > 0 && 
            <IngredientsList ingredients={ingredients} />}

        {ingredients.length >= MIN_INGREDIENTS_FOR_RECIPE &&
            <GenerateRecipeBar /> }

        <AddMoreIngredientsMessage ingredients={ingredients} MIN_INGREDIENTS_FOR_RECIPE={MIN_INGREDIENTS_FOR_RECIPE} />
    </>
  )
}

function AddMoreIngredientsMessage({ ingredients, MIN_INGREDIENTS_FOR_RECIPE }) {
    let add_more_ingredients_message = null;
    if (ingredients.length < MIN_INGREDIENTS_FOR_RECIPE) {
        if(ingredients.length === 0) {
            return (
                <p className="add-more-ingredients-message">
                    Add at least {MIN_INGREDIENTS_FOR_RECIPE} ingredients to enable recipe generation.
                </p>
            );
        } else {
            const ingredients_needed = MIN_INGREDIENTS_FOR_RECIPE - ingredients.length;
            return (
                <p className="add-more-ingredients-message-light">
                    (add {ingredients_needed} more ingredient{ingredients_needed > 1 ? 's' : ''})
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

function IngredientsList({ ingredients }) {

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    return (
        <div className="ingredients-list">
            <h3>Ingredients on hand...</h3>
            <ul>
                {ingredientListItems}
            </ul>
        </div>
    );
}

export default App
