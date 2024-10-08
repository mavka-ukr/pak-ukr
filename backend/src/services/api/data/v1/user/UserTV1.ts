import { User } from "../../../../../database/main/models/User.js";
import MakeData from "../../../../../application/MakeData.js";
import { MethodContext } from "../../../../../application/index.js";
import {
  X2Abstract,
  X2Builder,
  X2Concrete,
  X2Param,
} from "@storinka/invoke/x2.js";

class UserTV1Builder extends X2Builder {
  public static makeHavingData(user: User, makeData: MakeData): UserTV1 {
    throw new Error("Not implemented");
  }

  public static makeHavingDataNullable(
    user: User | null,
    makeData: MakeData,
  ): UserTV1 | null {
    return user ? this.makeHavingData(user, makeData) : null;
  }

  public static makeListHavingData(
    users: User[],
    makeData: MakeData,
  ): UserTV1[] {
    return users.map((user) => this.makeHavingData(user, makeData));
  }

  public static async buildMakeData(
    items: User[],
    methodContext: MethodContext,
  ): Promise<MakeData> {
    throw new Error("Not implemented");
  }

  public static async make(
    user: User,
    methodContext: MethodContext,
  ): Promise<UserTV1> {
    const makeData = await this.buildMakeData([user], methodContext);
    return this.makeHavingData(user, makeData);
  }

  public static async makeNullable(
    user: User | null,
    methodContext: MethodContext,
  ): Promise<UserTV1 | null> {
    return user ? this.make(user, methodContext) : null;
  }

  public static async makeList(
    users: User[],
    methodContext: MethodContext,
  ): Promise<UserTV1[]> {
    const makeData = await this.buildMakeData(users, methodContext);
    return this.makeListHavingData(users, makeData);
  }
}

@X2Abstract("UserT")
export class UserTV1 extends UserTV1Builder {
  public static makeHavingData(user: User, makeData: MakeData): UserTV1 {
    return UserV1.makeHavingData(user, makeData);
  }
}

@X2Concrete("DeletedUser")
export class DeletedUserV1 extends UserTV1 {
  @X2Param(Number)
  public id: number;

  public static makeHavingData(user: User, makeData: MakeData): UserTV1 {
    const deletedUserV1 = new DeletedUserV1();
    deletedUserV1.id = user.id;
    return deletedUserV1;
  }

  public static async buildMakeData(
    items: User[],
    methodContext: MethodContext,
  ): Promise<MakeData> {
    return new MakeData({
      methodContext,
      userList: [...items],
    });
  }
}

@X2Concrete("User")
export class UserV1 extends UserTV1 {
  @X2Param(Number)
  public id: number;

  @X2Param(String)
  public name: string;

  @X2Param(String)
  public username: string;

  @X2Param([String, null])
  public avatarUrl: string | null;

  public static makeHavingData(user: User, makeData: MakeData): UserTV1 {
    const userV1 = new UserV1();
    userV1.id = user.id;
    userV1.name = user.name;
    userV1.username = `а${user.id}`;
    userV1.avatarUrl = user.avatar_url;
    return userV1;
  }

  public static async buildMakeData(
    items: User[],
    methodContext: MethodContext,
  ): Promise<MakeData> {
    const makeData = new MakeData({ methodContext, userList: [...items] });
    return makeData;
  }
}
