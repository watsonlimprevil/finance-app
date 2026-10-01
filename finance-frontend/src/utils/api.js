export const API_URL = "http://localhost:5000";

export function authHeader() {
  return {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  };
}
