import fetch from "isomorphic-fetch";

export async function MySpecialComputation(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return await response.json();
}
