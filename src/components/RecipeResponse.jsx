
import ReactMarkdown from 'react-markdown'

export default function RecipeResponse({article, ref}) {
    return (
        <section ref={ref} className="suggested-recipe-container">
            <ReactMarkdown>
                {article}
            </ReactMarkdown>
        </section>
    )
}