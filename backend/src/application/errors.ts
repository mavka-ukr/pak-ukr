import { InvokeMethodError } from "@storinka/invoke/server.js";

export const PAK_ERROR_RECORD_NOT_FOUND = new InvokeMethodError(
  "RECORD_NOT_FOUND",
  400,
);
export const PAK_SERVER_ERROR = new InvokeMethodError("SERVER_ERROR", 500);
export const PAK_ERROR_INVALID_PAK_NAME = new InvokeMethodError(
  "INVALID_PAK_NAME",
  400,
);
export const PAK_ERROR_PAK_NAME_NOT_AVAILABLE = new InvokeMethodError(
  "PAK_NAME_NOT_AVAILABLE",
  400,
);
export const PAK_ERROR_INVALID_PAK_VERSION_NAME = new InvokeMethodError(
  "INVALID_PAK_NAME",
  400,
);
export const PAK_ERROR_PAK_VERSION_NAME_NOT_AVAILABLE = new InvokeMethodError(
  "PAK_NAME_NOT_AVAILABLE",
  400,
);
export const PAK_ERROR_FORBIDDEN = new InvokeMethodError("FORBIDDEN", 403);
