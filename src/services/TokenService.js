import { store } from "../store"; // Importa el store directamente
import { PERSIST_STORE_NAME } from "constants/app.constant";
import deepParseJson from "utils/deepParseJson";

export const getAccessToken = () => {
  // Obtén el token del estado global de Redux
  const state = store.getState();
  const reduxToken = state.auth?.session?.token;

  // Si el token no está en Redux, intenta obtenerlo desde localStorage
  if (!reduxToken) {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    const persistData = deepParseJson(rawPersistData);
    return persistData?.auth?.session?.token || null;
  }

  return reduxToken;
};
