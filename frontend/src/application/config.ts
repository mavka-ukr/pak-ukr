export const CONFIG = {
  PAK_WEB_DOMAIN: import.meta.env.VITE_PAK_WEB_DOMAIN || "",
  PAK_WS_SERVER_URL: import.meta.env.VITE_PAK_WS_SERVER_URL || "",
  PAK_API_VERSION: import.meta.env.VITE_PAK_API_VERSION || "",
  PAK_MAVKA_AUTH_CLIENT_ID: import.meta.env.VITE_PAK_MAVKA_AUTH_CLIENT_ID || "",
  PAK_UPLOAD_URL: import.meta.env.VITE_PAK_UPLOAD_URL || ""
};

export function isHostnameProduction() {
  return CONFIG.PAK_WEB_DOMAIN === "пак.укр";
}
