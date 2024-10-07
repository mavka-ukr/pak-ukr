import { X2Builder, X2Concrete, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthRequired } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { PakVersionTV1 } from "../../../data/v1/pak/PakVersionTV1.js";
import createPakVersionMethodHandler from "../../../handlers/paks/createPakVersionMethodHandler.js";

@X2Concrete("CreatePakVersionMethodV1Params")
class CreatePakVersionMethodV1Params extends X2Builder {
  @X2Param(Number)
  public pakId: number;

  @X2Param(String)
  public name: string;

  @X2Param(String)
  public description: string;

  @X2Param(Number)
  public fileId: number;
}

const createPakVersionMethodV1 = createAppMethod(
  InvokeMethodAuthRequired,
  CreatePakVersionMethodV1Params,
  PakVersionTV1,
  async (params, context) => {
    const pakVersion = await createPakVersionMethodHandler(params, context);
    return {
      result: await PakVersionTV1.make(pakVersion, context),
    };
  },
);

export default createPakVersionMethodV1;
