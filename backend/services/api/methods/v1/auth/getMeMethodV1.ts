import { X2Builder, X2Concrete } from "@storinka/invoke/x2.js";
import { InvokeMethodAuthRequired } from "@storinka/invoke/server.js";
import { createAppMethod } from "../../../../../application/index.js";
import { MeTV1, MeV1 } from "../../../data/v1/auth/MeTV1.js";
import getMeMethodHandler from "../../../handlers/auth/getMeMethodHandler.js";

@X2Concrete("GetMeMethodV1Params")
class GetMeMethodV1Params extends X2Builder {
}

const getMeMethodV1 = createAppMethod(
  InvokeMethodAuthRequired,
  GetMeMethodV1Params,
  MeTV1,
  async (params, context) => {
    const user = await getMeMethodHandler(params, context);
    return {
      result: await MeV1.makeForUser(user, context)
    };
  }
);

export default getMeMethodV1;
