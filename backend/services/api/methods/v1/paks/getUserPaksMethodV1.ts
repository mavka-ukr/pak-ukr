import { X2Builder, X2Concrete, X2List, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthRequired } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { PakTV1 } from "../../../data/v1/post/PakTV1.js";
import getUserPaksMethodHandler from "../../../handlers/paks/getUserPaksMethodHandler.js";

@X2Concrete("GetUserPaksMethodV1Params")
class GetUserPaksMethodV1Params extends X2Builder {
  @X2Param(Number)
  public userId: number;

  @X2Param(Number)
  public limit: number;

  @X2Param([Number, null])
  public cursorId: number | null;
}

const getUserPaksMethodV1 = createAppMethod(
  InvokeMethodAuthRequired,
  GetUserPaksMethodV1Params,
  X2List(PakTV1),
  async (params, context) => {
    const posts = await getUserPaksMethodHandler(params, context);
    return {
      result: await PakTV1.makeList(posts, context),
    };
  },
);

export default getUserPaksMethodV1;
