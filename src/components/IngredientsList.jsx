export default function IngredientsList({ ingredients, onClearIngredientsClick }) {

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    return (
        <div className="ingredients-list">
            <div className="clear-ingredients-wrapper">
                <button className="clear-ingredients-button" onClick={onClearIngredientsClick}>X</button>
            </div>
            <ul style={{paddingTop: "0", marginTop: "0"}}>
                {ingredientListItems}
            </ul>
        </div>
    );
}