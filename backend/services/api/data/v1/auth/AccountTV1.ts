import { X2Abstract, X2Builder, X2Concrete } from "@storinka/invoke/x2.js";
import { User } from "../../../../../database/main/models/User.js";
import { AuthorizedMethodContext } from "../../../../../application/index.js";

class AccountTV1Builder extends X2Builder {}

@X2Abstract("AccountT")
export class AccountTV1 extends AccountTV1Builder {}

@X2Concrete("Account")
export class AccountV1 extends AccountTV1 {
  public static async makeForUser(
    user: User,
    context: AuthorizedMethodContext,
  ): Promise<AccountV1> {
    const accountV1 = new AccountV1();
    return accountV1;
  }
}
