import { X2Builder, X2Concrete, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthOptional } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { PakTV1 } from "../../../data/v1/pak/PakTV1.js";
import findPakByNameMethodHandler from "../../../handlers/paks/findPakByNameMethodHandler.js";

@X2Concrete("FindPakByNameMethodV1Params")
class FindPakByNameMethodV1Params extends X2Builder {
  @X2Param(String)
  public name: string;
}

const findPakByNameMethodV1 = createAppMethod(
  InvokeMethodAuthOptional,
  FindPakByNameMethodV1Params,
  [PakTV1, null],
  async (params, context) => {
    const pak = await findPakByNameMethodHandler(params, context);
    return {
      result: await PakTV1.makeNullable(pak, context),
    };
  },
);

export default findPakByNameMethodV1;
