export default function AddIngredientsBar(props) {

    return (
        <div>
            <form className="add-ingredient-form" action={props.handleSubmit}>
                <input 
                    type="text" 
                    name="ingredient"
                    id="ingredient"
                    placeholder={`e.g. ${props.random_ingredient}`} 
                    autoComplete="off"
                />
                <button>Add Ingredient</button>
            </form>
        </div>
    )
}