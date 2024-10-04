import { X2Builder, X2Concrete, X2List, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthRequired } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import getPakVersionsMethodHandler from "../../../handlers/paks/getPakVersionsMethodHandler.js";
import { PakVersionTV1 } from "../../../data/v1/pak/PakVersionTV1.js";

@X2Concrete("GetPakVersionsMethodV1Params")
class GetPakVersionsMethodV1Params extends X2Builder {
  @X2Param(Number)
  public pakId: number;

  @X2Param(Number)
  public limit: number;

  @X2Param([Number, null])
  public cursorId: number | null;
}

const getPakVersionsMethodV1 = createAppMethod(
  InvokeMethodAuthRequired,
  GetPakVersionsMethodV1Params,
  X2List(PakVersionTV1),
  async (params, context) => {
    const pakVersions = await getPakVersionsMethodHandler(params, context);
    return {
      result: await PakVersionTV1.makeList(pakVersions, context),
    };
  },
);

export default getPakVersionsMethodV1;
