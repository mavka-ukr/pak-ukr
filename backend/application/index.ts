import { Session } from "../database/main/models/Session.js";
import { User } from "../database/main/models/User.js";
import {
  createInvokeMethod,
  InvokeMethodAuthGuestOnly,
  InvokeMethodAuthRequired,
  InvokeMethodAuthType,
  InvokeMethodReturn
} from "@storinka/invoke/server.js";
import { X2Builder, X2InferRuntimeType, X2RuntimeTypeNoLazy } from "@storinka/invoke/x2.js";

export interface PakAuthorization {
  session: Session;
  user: User;
}

export async function createPakAuthorization(
  session: Session,
  user: User
): Promise<PakAuthorization> {
  return {
    session,
    user
  };
}

export interface GuestMethodContext {
  setAuthorization: (
    session: Session,
    user: User
  ) => Promise<AuthorizedMethodContext>;
}

export interface AuthorizedMethodContext {
  authorization: PakAuthorization;
}

export interface MethodContext {
  setAuthorization?: (
    session: Session,
    user: User
  ) => Promise<AuthorizedMethodContext>;
  authorization?: PakAuthorization;
}

export const createAppMethod = <
  PT extends typeof X2Builder,
  RT extends X2RuntimeTypeNoLazy | void,
  AUTH extends InvokeMethodAuthType,
>(
  auth: AUTH,
  paramsType: PT,
  returnType: RT,
  handler: (
    params: X2InferRuntimeType<PT>,
    context: AUTH extends typeof InvokeMethodAuthRequired
      ? AuthorizedMethodContext
      : AUTH extends typeof InvokeMethodAuthGuestOnly
        ? GuestMethodContext
        : AuthorizedMethodContext | GuestMethodContext
  ) => Promise<InvokeMethodReturn<X2InferRuntimeType<RT>, undefined>>
) =>
  createInvokeMethod<
    GuestMethodContext,
    AuthorizedMethodContext,
    PT,
    RT,
    AUTH,
    undefined
  >(auth, paramsType, returnType, handler);
