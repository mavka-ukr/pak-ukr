import {
  X2Abstract,
  X2Builder,
  X2Concrete,
  X2Param,
} from "@storinka/invoke/x2.js";
import { UserTV1, UserV1 } from "../user/UserTV1.js";
import { AuthorizedMethodContext } from "../../../../../application/index.js";
import { User } from "../../../../../database/main/models/User.js";
import { AccountTV1, AccountV1 } from "./AccountTV1.js";

class MeTV1Builder extends X2Builder {}

@X2Abstract("MeT")
export class MeTV1 extends MeTV1Builder {}

@X2Concrete("Me")
export class MeV1 extends MeTV1 {
  @X2Param(AccountTV1)
  public account: AccountTV1;

  @X2Param(UserTV1)
  public user: UserTV1;

  public static async makeForUser(
    user: User,
    context: AuthorizedMethodContext,
  ): Promise<MeV1> {
    const meV1 = new MeV1();
    meV1.account = await AccountV1.makeForUser(user, context);
    meV1.user = await UserV1.make(user, context);
    return meV1;
  }
}
