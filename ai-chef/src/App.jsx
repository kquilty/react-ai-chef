import './css/App.css'
import Header from './components/Header'
import AddIngredientsBar from './components/AddIngredientsBar'
import IngredientsList from './components/IngredientsList'
import GenerateRecipeBar from './components/GenerateRecipeBar'

function App() {

  return (
    <>
        <Header />
        <AddIngredientsBar />
        <IngredientsList />
        <GenerateRecipeBar />
    </>
  )
}

export default App
