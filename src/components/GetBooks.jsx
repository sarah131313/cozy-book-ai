import aiIcon from "../assets/ai-icon.png";
import bookIcon from "../assets/book-icon.png";
import "./GetBooks.css";

export default function GetBooks({ result, setResult, setHasSearched }) {
  const books = result;

  function handleClick() {
    setResult([])
    setHasSearched(false)
  }

  return (
    <section className="ai-books">
      {books.length > 0 && (
        <>
          <div className="recommendations-done">
            <img src={aiIcon} alt="ai icon" />
            <h2>AI-Curated Recommendations</h2>
            <img src={aiIcon} alt="ai icon" />
          </div>

          <p>
            Our AI has analyzed thousands of books to find these perfect matches
            for your taste
          </p>

          {books.map((book, index) => (
            <div key={index} className="book-card">
              <div className="cover-container">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="book-cover"
                />
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <div id="author-rating">
                  <p id="author">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p id="rating">
                    <strong>Rating:</strong> {book.rating}/5
                  </p>
                </div>
                <p id="summary">{book.summary}</p>
              </div>
            </div>
          ))}

          <button onClick={handleClick}>
            <img src={bookIcon} alt="book icon" />
            <p>Search Again</p>
          </button>
        </>
      )}
    </section>
  );
}
