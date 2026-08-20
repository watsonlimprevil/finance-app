export const API_URL = 'https://finance-backend-production-7438.up.railway.app';

export function authHeader() {
  return {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  };
}
