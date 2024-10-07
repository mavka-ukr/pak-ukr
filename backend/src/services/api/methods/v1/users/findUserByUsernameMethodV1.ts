import { X2Builder, X2Concrete, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthOptional } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { UserTV1 } from "../../../data/v1/user/UserTV1.js";
import findUserByUsernameMethodHandler from "../../../handlers/users/findUserByUsernameMethodHandler.js";

@X2Concrete("FindUserByUsernameMethodV1Params")
class FindUserByUsernameMethodV1Params extends X2Builder {
  @X2Param(String)
  public username: string;
}

const findUserByUsernameMethodV1 = createAppMethod(
  InvokeMethodAuthOptional,
  FindUserByUsernameMethodV1Params,
  [UserTV1, null],
  async (params, context) => {
    const user = await findUserByUsernameMethodHandler(params, context);
    return {
      result: await UserTV1.makeNullable(user, context),
    };
  },
);

export default findUserByUsernameMethodV1;
