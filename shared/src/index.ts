// Example shared types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
}

// Add more shared types as needed
export function hello() {
  console.log('Hello Angular, from shared!');
}
