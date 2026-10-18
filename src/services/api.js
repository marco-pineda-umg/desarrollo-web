const API_URL = import.meta.env.VITE_APP_URL;
let sessionExpired = () => {};

export function onSessionExpired(callback) {
  sessionExpired = callback;
}

export async function api(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = "Bearer " + token;

  let response;
  try {
    response = await fetch(API_URL + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Error de conexion con el servidor");
  }

  const data = await response.json().catch(() => ({}));
  // Si el token se vencio o ya no es valido se cierra la sesion
  if (response.status === 401 && token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionExpired();
  }
  if (!response.ok) {
    throw new Error(data.message || "Error de servidor");
  }
  return data;
}
