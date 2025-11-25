
import ReactMarkdown from 'react-markdown'

export default function RecipeResponse({article}) {
    return (
        <section className="suggested-recipe-container">
            <ReactMarkdown>
                {article}
            </ReactMarkdown>
        </section>
    )
}