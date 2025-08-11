export async function fetchCover(title, author) {
  try {
    const queryTitle = encodeURIComponent(title)
    const queryAuthor = encodeURIComponent(author)
    const url = `https://openlibrary.org/search.json?title=${queryTitle}&author=${queryAuthor}&limit=1`

    const response = await fetch(url)
    const data = await response.json()

    if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`
    }

    return null // No cover found
  } catch {
    return null // Error occurred
  }
}

