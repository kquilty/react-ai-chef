export default function IngredientsList() {

    const ingredients = ['Tomatoes', 'Onions', 'Garlic'];

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    return (
        <>
            <h2>Ingredients on hand:</h2>
            <ul>
                {ingredientListItems}
            </ul>
        </>
    )
}