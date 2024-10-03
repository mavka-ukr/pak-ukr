import { User, UserDb } from "../database/main/models/User.js";
import { MethodContext } from "./index.js";
import { Pak, PakDb } from "../database/main/models/Pak.js";
import {
  PakVersion,
  PakVersionDb,
} from "../database/main/models/PakVersion.js";

class MakeData {
  public methodContext: MethodContext;
  public userList: User[];
  public pakList: Pak[];
  public pakVersionList: PakVersion[];

  constructor(params: {
    methodContext: MethodContext;
    mergeData?: MakeData;
    userList?: User[];
    pakList?: Pak[];
    pakVersionList?: PakVersion[];
  }) {
    this.methodContext = params.methodContext;
    this.userList = params.userList || [];
    this.pakList = params.pakList || [];
    this.pakVersionList = params.pakVersionList || [];
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
    this.pakVersionList = [...this.pakVersionList, ...data.pakVersionList];
  }

  public async fetchUsers(ids: number[]) {
    const uniqueIds = ids.filter(
      (userId, index) => ids.indexOf(userId) === index,
    );
    const userList = await UserDb.findManyByIds(uniqueIds);
    this.userList = [...this.userList, ...userList];
    return this.userList.filter((user) => ids.includes(user.id));
  }

  public async fetchPaks(ids: number[]) {
    const uniqueIds = ids.filter(
      (pakId, index) => ids.indexOf(pakId) === index,
    );
    const pakList = await PakDb.findManyByIds(uniqueIds);
    this.pakList = [...this.pakList, ...pakList];
    return this.pakList.filter((pak) => ids.includes(pak.id));
  }

  public async fetchPakVersions(ids: number[]) {
    const uniqueIds = ids.filter(
      (pakId, index) => ids.indexOf(pakId) === index,
    );
    const pakVersionList = await PakVersionDb.findManyByIds(uniqueIds);
    this.pakVersionList = [...this.pakVersionList, ...pakVersionList];
    return this.pakVersionList.filter((pakVersion) =>
      ids.includes(pakVersion.id),
    );
  }
}

export default MakeData;
