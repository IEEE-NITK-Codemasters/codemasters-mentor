export async function signUp(name: string, email: string, password: string) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  })
}