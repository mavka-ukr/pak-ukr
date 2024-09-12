import {
  X2Abstract,
  X2Builder,
  X2Concrete,
  X2Param,
} from "@storinka/invoke/x2.js";

class AuthTV1Builder extends X2Builder {}

@X2Abstract("AuthT")
export class AuthTV1 extends AuthTV1Builder {}

@X2Concrete("Auth")
export class AuthV1 extends AuthTV1 {
  @X2Param(String)
  public token: string;

  public static async makeForToken(token: string): Promise<AuthV1> {
    const authV1 = new AuthV1();
    authV1.token = token;
    return authV1;
  }
}
