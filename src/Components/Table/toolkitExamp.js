
// For actions service calling making async functionalities
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetch", 
    async () => {
      // Fetch the backend endpoint:
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`
      );
      // Get the JSON from the response:
      const data = await response.json();
      
      // Return result:
      return data;
    }
  );