"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function changeStatusAction(data: any) {
  try {
    const headerList = headers();
    const authorId = parseInt(headerList.get("id") || "");
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/${authorId}/tasks/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          status: !data.status,
        }),
      }
    );
    if (!response.ok) {
      // Handle error for non-2xx responses
      const errorData = await response.json(); // Parse error response
      console.error("Error:", errorData);
    } else {
      // Handle success for 2xx responses
      const result = await response.json();
      console.log("Success:", result);
    }
  } catch (error: any) {
    console.error("Network Error:", error);
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function deleteTaskAction(id: any) {
  try {
    const headerList = headers();
    const authorId = parseInt(headerList.get("id") || "");
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/${authorId}/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Handle error for non-2xx responses
      const errorData = await response.json(); // Parse error response
      console.error("Error:", errorData);
    } else {
      // Handle success for 2xx responses
      const result = await response.json();
      console.log("Success:", result);
    }
  } catch (error: any) {
    console.error("Network Error:", error);
  } finally {
    revalidatePath("/dashboard");
  }
}
