import axios from "axios";

export async function getBookRecommendation(userInput) {
  try {
    const response = await axios.post("http://localhost:4000/api/recommendations", { userInput });
    return response.data;  // This will be the JSON string or array from your backend
  } catch (error) {
    console.error("Backend API error:", error);
    return null;
  }
}

