import { X2Builder, X2Concrete, X2Param } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthRequired } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { PakTV1 } from "../../../data/v1/pak/PakTV1.js";
import createPakMethodHandler from "../../../handlers/paks/createPakMethodHandler.js";

@X2Concrete("CreatePakMethodV1Params")
class CreatePakMethodV1Params extends X2Builder {
  @X2Param(String)
  public name: string;

  @X2Param(String)
  public description: string;

  @X2Param(String)
  public docsUrl: string;

  @X2Param(String)
  public sourceUrl: string;
}

const createPakMethodV1 = createAppMethod(
  InvokeMethodAuthRequired,
  CreatePakMethodV1Params,
  PakTV1,
  async (params, context) => {
    const pak = await createPakMethodHandler(params, context);
    return {
      result: await PakTV1.make(pak, context),
    };
  },
);

export default createPakMethodV1;
