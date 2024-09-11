import { SessionDb } from "../../database/main/models/Session.js";
import { UserDb } from "../../database/main/models/User.js";
import { CONFIG } from "../../application/config.js";
import methods from "./methods/v1/index.js";
import {
  AuthorizedMethodContext,
  createPakAuthorization,
  GuestMethodContext,
  PakAuthorization,
} from "../../application/index.js";
import {
  INVOKE_UNAUTHORIZED_ERROR,
  InvokeMethodError,
  InvokeWsUserData,
  startInvokeWsServer,
} from "@storinka/invoke/server.js";
import { X2ValidationError } from "@storinka/invoke/x2.js";
import { PAK_ERROR_RECORD_NOT_FOUND } from "../../application/errors.js";
import { HttpRequest, WebSocket } from "uWebSockets.js";

const PORT = CONFIG.APP_PORT;
const NAME = "Pak API";

const createAuthorizedMethodContext = (
  options: {
    ws?: WebSocket<InvokeWsUserData<PakAuthorization, undefined>>;
    req?: HttpRequest;
  },
  authorization: PakAuthorization,
): AuthorizedMethodContext => {
  return {
    authorization,
  };
};

startInvokeWsServer<
  PakAuthorization,
  GuestMethodContext,
  AuthorizedMethodContext,
  undefined,
  undefined
>({
  port: PORT,
  ssl: CONFIG.APP_SSL
    ? {
        sslCertFileName: CONFIG.APP_SSL_CERT_FILE_NAME,
        sslKeyFileName: CONFIG.APP_SSL_KEY_FILE_NAME,
      }
    : undefined,
  methods,
  authorize: (token) =>
    SessionDb.findByToken(token).then((session) => {
      if (session) {
        return UserDb.findById(session.user_id).then((user) => {
          if (user) {
            return createPakAuthorization(session, user);
          } else {
            throw PAK_ERROR_RECORD_NOT_FOUND;
          }
        });
      } else {
        throw INVOKE_UNAUTHORIZED_ERROR;
      }
    }),
  createGuestMethodContext: (options) => {
    return {
      setAuthorization: async (session, user) => {
        const authorization = await createPakAuthorization(session, user);
        if (options.ws) {
          const wsUserData = options.ws.getUserData();
          wsUserData.authorization = authorization;
        }
        return createAuthorizedMethodContext(options, authorization);
      },
    };
  },
  createAuthorizedMethodContext,
  exceptionToResult: (exception) => {
    if (exception) {
      if (exception instanceof InvokeMethodError) {
        return {
          e: exception.name,
        };
      } else if (exception instanceof X2ValidationError) {
        return {
          e: "VALIDATION_FAILED",
        };
      } else {
        console.error(exception);
        return {
          e: "SERVER_ERROR",
          message: String(exception),
        };
      }
    }
    return {
      e: "SERVER_ERROR",
    };
  },
  callback: (wsApp, listenSocket) => {
    if (listenSocket) {
      console.log(
        `[${NAME}] Listening to ${CONFIG.APP_SSL ? "wss" : "ws"}://127.0.0.1:${PORT}`,
      );
      console.log(
        `[${NAME}] Listening to ${CONFIG.APP_SSL ? "https" : "http"}://127.0.0.1:${PORT}`,
      );
    } else {
      console.log(`[${NAME}] Failed to listen to port ${PORT}`);
    }
  },
  onOpen: () => {},
  onClose: (ws) => {},
  onInitialized: () => {},
  onAuthorized: (ws, authorization) => {},
  getUpdatesAfterReconnect: async (authorization, clientLastUpdateId) => {
    return [];
  },
  getLastUpdateId: async (authorization) => {
    return null;
  },
  publishUpdate: async (ws, update) => {},
});
