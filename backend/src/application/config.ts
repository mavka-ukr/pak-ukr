export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "",
  APP_DEBUG: process.env.APP_DEBUG === "true",
  APP_PORT: Number(process.env.APP_PORT),
  APP_SSL: process.env.APP_SSL === "true",
  APP_SSL_CERT_FILE_NAME: process.env.APP_SSL_CERT_FILE_NAME || "",
  APP_SSL_KEY_FILE_NAME: process.env.APP_SSL_KEY_FILE_NAME || "",
  DB_MAIN_HOST: process.env.DB_MAIN_HOST || "",
  DB_MAIN_PORT: Number(process.env.DB_MAIN_PORT),
  DB_MAIN_USER: process.env.DB_MAIN_USER || "",
  DB_MAIN_PASSWORD: process.env.DB_MAIN_PASSWORD || "",
  DB_MAIN_DATABASE: process.env.DB_MAIN_DATABASE || "",
};

export const isDevelopment = CONFIG.NODE_ENV === "development";
