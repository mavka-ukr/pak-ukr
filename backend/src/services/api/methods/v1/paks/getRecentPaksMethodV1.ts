import { X2Builder, X2Concrete, X2List, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthRequired } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { PakTV1 } from "../../../data/v1/post/PakTV1.js";
import getRecentPaksMethodHandler from "../../../handlers/paks/getRecentPaksMethodHandler.js";

@X2Concrete("GetRecentPaksMethodV1Params")
class GetRecentPaksMethodV1Params extends X2Builder {
  @X2Param(Number)
  public limit: number;

  @X2Param([Number, null])
  public cursorId: number | null;
}

const getRecentPaksMethodV1 = createAppMethod(
  InvokeMethodAuthRequired,
  GetRecentPaksMethodV1Params,
  X2List(PakTV1),
  async (params, context) => {
    const posts = await getRecentPaksMethodHandler(params, context);
    return {
      result: await PakTV1.makeList(posts, context),
    };
  },
);

export default getRecentPaksMethodV1;
