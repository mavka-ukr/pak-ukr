import { X2Builder, X2Concrete, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthOptional } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { PakVersionTV1 } from "../../../data/v1/pak/PakVersionTV1.js";
import findPakVersionByPakIdAndNameMethodHandler from "../../../handlers/paks/findPakVersionByPakIdAndNameMethodHandler.js";

@X2Concrete("FindPakVersionByPakIdAndNameMethodV1Params")
class FindPakVersionByPakIdAndNameMethodV1Params extends X2Builder {
  @X2Param(Number)
  public pakId: number;

  @X2Param(String)
  public name: string;
}

const findPakVersionByPakIdAndNameMethodV1 = createAppMethod(
  InvokeMethodAuthOptional,
  FindPakVersionByPakIdAndNameMethodV1Params,
  [PakVersionTV1, null],
  async (params, context) => {
    const pak = await findPakVersionByPakIdAndNameMethodHandler(
      params,
      context,
    );
    return {
      result: await PakVersionTV1.makeNullable(pak, context),
    };
  },
);

export default findPakVersionByPakIdAndNameMethodV1;
