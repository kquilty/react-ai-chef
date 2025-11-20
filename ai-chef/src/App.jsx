import { useState } from 'react';

import './css/App.css'
import Header from './components/Header'
// import AddIngredientsBar from './components/AddIngredientsBar'
// import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'


function App() {

    let [ingredients, setIngredients] = useState(['Tomatoes', 'Onions', 'Garlic']);

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    


    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const ingredient = formData.get('ingredient'); // event.target.ingredient.value

        // Add the new ingredient to the list
        setIngredients([...ingredients, ingredient]);
        
    }



    return (
    <>
        <Header />



        {/* <AddIngredientsBar /> */}
        <div>
            <form className="add-ingredient-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="ingredient"
                    id="ingredient"
                    placeholder="e.g. tomatoes" 
                />
                <button>Add Ingredient</button>
            </form>
        </div>






        {/* <IngredientsList /> */}
        <div>
            <h2>Ingredients on hand:</h2>
            <ul>
                {ingredientListItems}
            </ul>
        </div>







        <GenerateRecipeBar />
    </>
  )
}

export default App
