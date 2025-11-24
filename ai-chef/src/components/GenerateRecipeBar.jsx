export default function GenerateRecipeBar({ onClick }) {
    return (
        <div className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={onClick}>Get a recipe</button>
        </div>
    )
}