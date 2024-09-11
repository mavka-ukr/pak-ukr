import { User, UserDb } from "../database/main/models/User.js";
import { MethodContext } from "./index.js";
import { Pak, PakDb } from "../database/main/models/Pak.js";

class MakeData {
  public methodContext: MethodContext;
  public userList: User[];
  public pakList: Pak[];

  constructor(params: {
    methodContext: MethodContext;
    mergeData?: MakeData;
    userList?: User[];
    pakList?: Pak[];
  }) {
    this.methodContext = params.methodContext;
    this.userList = params.userList || [];
    this.pakList = params.pakList || [];
    if (this.methodContext.authorization) {
      this.userList.push(this.methodContext.authorization.user);
    }
    if (params.mergeData) {
      this.merge(params.mergeData);
    }
  }

  public merge(data: MakeData) {
    this.userList = [...this.userList, ...data.userList];
    this.pakList = [...this.pakList, ...data.pakList];
  }

  public async fetchUsers(ids: number[]) {
    const uniqueIds = ids.filter(
      (userId, index) => ids.indexOf(userId) === index
    );
    const userList = await UserDb.findManyByIds(uniqueIds);
    this.userList = [...this.userList, ...userList];
    return this.userList.filter((user) => ids.includes(user.id));
  }

  public async fetchPaks(ids: number[]) {
    const uniqueIds = ids.filter(
      (pakId, index) => ids.indexOf(pakId) === index
    );
    const pakList = await PakDb.findManyByIds(uniqueIds);
    this.pakList = [...this.pakList, ...pakList];
    return this.pakList.filter((pak) => ids.includes(pak.id));
  }
}

export default MakeData;
