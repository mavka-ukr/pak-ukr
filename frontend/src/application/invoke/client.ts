import { CONFIG, isHostnameProduction } from "@/application/config";
import { createInvokeWSJSONClient } from "@storinka/invoke-client/InvokeWSJSONClient";
import {
  getSessionTokenFromStorage,
  removeSessionTokenFromStorage
} from "@/application/token";

const pakInvokeClient = createInvokeWSJSONClient<any>({
  serverUrl: CONFIG.PAK_WS_SERVER_URL,
  apiVersion: CONFIG.PAK_API_VERSION,
  onConnectionStatusChanged: (status) => {
    console.warn("WS", status);
  },
  onWebSocketChanged: () => {},
  handleUpdate: () => {
    //
  },
  handleUpdatesTooLong: () => {
    window.location.reload();
  },
  handleUnauthorized: () => {
    removeSessionTokenFromStorage();
    window.location.reload();
  },
  getRetryTimeout: () => 1000,
  getAuthorizationToken: () => getSessionTokenFromStorage()
});

export function invoke<R>(
  name: string,
  params: Record<string, any>
): Promise<R> {
  if (!isHostnameProduction()) {
    console.warn("invoke", name, params);
  }
  return new Promise<R>((resolve, reject) => {
    setTimeout(() => {
      pakInvokeClient.invoke<R>(name, params).then(resolve).catch(reject);
    }, 0);
  });
}

export default pakInvokeClient;
