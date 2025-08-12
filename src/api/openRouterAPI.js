import axios from "axios"

export async function getBookRecommendation(userInput) {
  try {
    const response = await axios.post("https://cozy-book-ai.onrender.com/api/recommendations", { userInput })
    // return response.data;  // This will be the JSON string or array from the backend
    return response.data.content
  } catch (error) {
    console.error("Backend API error:", error)
    return null
  }
}

