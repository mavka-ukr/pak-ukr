import { X2Builder, X2Concrete, X2List, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthRequired } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { UserTV1, UserV1 } from "../../../data/v1/user/UserTV1.js";
import getRecentUsersMethodHandler from "../../../handlers/users/getRecentUsersMethodHandler.js";

@X2Concrete("GetRecentUsersMethodV1Params")
class GetRecentUsersMethodV1Params extends X2Builder {
  @X2Param(String)
  public type: string;

  @X2Param(Number)
  public limit: number;

  @X2Param([Number, null])
  public cursorId: number | null;
}

const getRecentUsersMethodV1 = createAppMethod(
  InvokeMethodAuthRequired,
  GetRecentUsersMethodV1Params,
  X2List(UserTV1),
  async (params, context) => {
    const users = await getRecentUsersMethodHandler(params, context);
    return {
      result: await UserV1.makeList(users, context)
    };
  }
);

export default getRecentUsersMethodV1;
