import { headers } from "next/headers";

export const getUser = async () => {
  const headerList = headers();
  const user_id = parseInt(headerList.get("id") || "");

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users/${user_id}`);

    if (!response.ok) {
      // Handle non-2xx responses
      const errorData = await response.json(); // Parse error response
      return {
        error: {
          message: errorData.message || "Error fetching user data",
          status: response.status,
        },
      };
    }

    const userRes = await response.json();
    return {
      name: userRes.name,
      email: userRes.email,
    };
  } catch (error) {
    // Handle network or other errors
    console.error("Error fetching user data:", error);
    return {
      error: {
        message: "Network error or other issue",
      },
    };
  }
};
