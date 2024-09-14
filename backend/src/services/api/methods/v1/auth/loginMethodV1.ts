import { X2Builder, X2Concrete, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthGuestOnly } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { AuthTV1, AuthV1 } from "../../../data/v1/auth/AuthTV1.js";
import loginMethodHandler from "../../../handlers/auth/loginMethodHandler.js";

@X2Concrete("LoginMethodV1Params")
class LoginMethodV1Params extends X2Builder {
  @X2Param(String)
  public mavkaCode: string;

  @X2Param(String)
  public redirectUri: string;
}

const loginMethodV1 = createAppMethod(
  InvokeMethodAuthGuestOnly,
  LoginMethodV1Params,
  AuthTV1,
  async (params, context) => {
    const token = await loginMethodHandler(params, context);
    return {
      result: await AuthV1.makeForToken(token),
    };
  },
);

export default loginMethodV1;
