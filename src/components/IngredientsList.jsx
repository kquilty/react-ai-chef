export default function IngredientsList({ ingredients, onClearIngredientsClick }) {

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <div key={index} className="added-ingredient">
            <div>-</div>
            <div>{ingredient}</div>
        </div>
    ));

    return (
        <div className="ingredients-list-wrapper">
            <div className="clear-ingredients-wrapper">
                <button className="clear-ingredients-button" onClick={onClearIngredientsClick}>X</button>
            </div>
            <div className="ingredients-list" style={{paddingTop: "0", marginTop: "0"}}>
                {ingredientListItems}
            </div>
        </div>
    );
}