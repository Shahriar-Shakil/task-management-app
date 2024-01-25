export interface TaskInterface {
  createdAt: string; // Assuming a string representation of a date
  title: string;
  priority: "low" | "medium" | "high"; // Assuming priority can be one of these values
  status: boolean;
  id: string; // Assuming id is a string, but it might be a number, depending on your use case
  userId: string; // Assuming userId is a string
}
