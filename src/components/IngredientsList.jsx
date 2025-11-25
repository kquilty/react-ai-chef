export default function IngredientsList({ ingredients }) {

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    return (
        <div className="ingredients-list">
            <ul>
                {ingredientListItems}
            </ul>
        </div>
    );
}