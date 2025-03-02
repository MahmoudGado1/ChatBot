const BASE_URL = "http://127.0.0.1:8000/api";

const fetchAPI = async (endpoint, method = "GET", body = null) => {
  try {
    const token = localStorage.getItem("authToken");

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${BASE_URL}/${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch: ${errorData}`);
    }

    // Handle empty response (e.g., DELETE requests)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Fetch API error:", error);
    throw error;
  }
};

export default fetchAPI;
