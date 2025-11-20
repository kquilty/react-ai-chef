export default function AddIngredientsBar() {

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const ingredient = formData.get('ingredient'); // event.target.ingredient.value
        
        console.log("Add Ingredient form submitted: ", ingredient);
        
    }

    return (
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
    )
}