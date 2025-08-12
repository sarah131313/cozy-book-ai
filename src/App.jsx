import { useState } from "react"
import Header from "./components/Header"
import GetBooks from "./components/GetBooks"
import { getBookRecommendation } from "./api/openRouterAPI"
import { fetchCover } from "./api/fetchCover"
import aiIcon from "./assets/ai-icon.png"
import "./App.css"

export default function App() {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const userInput = e.target.text.value.trim()

    if (!userInput) {
      setLoading(false)
      return
    }

    setHasSearched(true)

    // 1.Get AI JSON string
    const answer = await getBookRecommendation(userInput)
    if (!answer) {
      setResult([])
      setLoading(false)
      return
    }

    // 2.Parse AI JSON string to array
    let books = []
    try {
      books = JSON.parse(answer);
    } catch {
      books = []
    }

    // 3.Fetch cover for each book and add to object
    for (let i = 0; i < books.length; i++) {
      books[i].cover = await fetchCover(books[i].title, books[i].author)
    }

    // 4.Set array state directly
    setResult(books)
    setLoading(false)
  }

  return (
    <>
      <Header />
      <section className="form-container">
        <p>What kind of book are you looking for?</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="e.g., I enjoy classic literature like Jane Austen, or magical adventures like Harry Potter."
            id="text"
            aria-label="Book search"
          />
          <button disabled={loading}>
            <img src={aiIcon} alt="ai icon" />
            <p>{loading ? "Finding books..." : "Get Recommendations"}</p>
          </button>
        </form>
      </section>
      {result.length === 0 && <p id="start-search">Type something to discover your next favorite book.</p>}
      {result.length > 0 && 
            <GetBooks result={result} 
            setResult={setResult}
            setHasSearched={setHasSearched} />
      }
      {hasSearched && result.length === 0 && !loading && (
        <p className="no-books">No book recommendations found. Try a different search.</p>
      )}

      
    </>
  )
}

