export default function AddIngredientsBar() {

    function handleSubmit(formData) {
        const ingredient = formData.get('ingredient');
        
        console.log("Add Ingredient form submitted: ", ingredient);
        
    }

    const random_ingredient = "spinach";

    return (
        <div>
            <form className="add-ingredient-form" action={handleSubmit}>
                <input 
                    type="text" 
                    name="ingredient"
                    id="ingredient"
                    placeholder={`e.g. ${random_ingredient}`} 
                />
                <button>Add Ingredient</button>
            </form>
        </div>
    )
}