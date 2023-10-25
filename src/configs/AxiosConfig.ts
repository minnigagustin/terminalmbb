import axios from "axios";
import { useAuthStore } from "./../stores/auth";

const AxiosLogout = axios.create({
  baseURL: process.env.URL_BACKEND,
});

const AxiosLogged = axios.create({
  baseURL: process.env.URL_BACKEND,
});

const authStore = useAuthStore; // Obtén la función de estado fuera del interceptor

AxiosLogged.interceptors.request.use(
  async function (config) {
    const { tokens } = authStore.getState();
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Agrega un interceptor de respuesta para manejar la renovación del token
AxiosLogged.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      // El token ha expirado, intenta renovarlo
      const { tokens } = authStore.getState();
      if (tokens && tokens.refresh) {
        try {
          const response = await AxiosLogged.post("/usuarios/token/refresh", {
            refresh: tokens.refresh,
          });
          const newAccessToken = response.data.access;

          // Actualiza el token de acceso en el estado de AuthStore
          authStore.setState((state) => ({
            ...state,
            tokens: {
              ...state.tokens,
              access: newAccessToken,
            },
          }));

          // Actualiza el token de acceso en la configuración de Axios
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          // Reintenta la solicitud original
          return AxiosLogged(error.config);
        } catch (refreshError) {
          // Si falla el refresco, redirige al usuario al inicio de sesión
          //@ts-ignore

          authStore.logout();
          // Puedes redirigir al usuario a la página de inicio de sesión aquí
        }
      } else {
        // Si no hay un token de refresco disponible, redirige al usuario al inicio de sesión
        //@ts-ignore
        authStore.logout();
        // Puedes redirigir al usuario a la página de inicio de sesión aquí
      }
    }
    return Promise.reject(error);
  }
);

export { AxiosLogout, AxiosLogged };
