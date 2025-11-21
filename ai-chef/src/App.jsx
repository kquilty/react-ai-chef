import { useState } from 'react';

import './css/App.css'
import Header from './components/Header'
// import AddIngredientsBar from './components/AddIngredientsBar'
// import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'


function App() {

    let [ingredients, setIngredients] = useState(
        // ['Tomatoes', 'Onions', 'Garlic']
        []
    );

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));



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

    function IngredientsList() {
        return (
            <div className="ingredients-list">
                <h2>Ingredients on hand...</h2>
                <ul>
                    {ingredientListItems}
                </ul>
            </div>
        );
    }

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
                    placeholder="e.g. tomatoes" 
                />
                <button>Add Ingredient</button>
            </form>
        </div>






        {ingredients.length > 0 && <IngredientsList />}







        {/* <GenerateRecipeBar /> */}
    </>
  )
}

export default App
