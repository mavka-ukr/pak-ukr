import PakPak from "@/application/models/PakPak";
import { AbstractInfiniteThread } from "@/application/threads/index";
import {
  invokeGetRecentPaks,
  invokeGetUserPaks,
} from "@/application/invoke/api";
import type PakUser from "@/application/models/PakUser";

export abstract class PaksThread extends AbstractInfiniteThread<PakPak> {}

export class RecentPaksThread extends PaksThread {
  protected fetchInitial(): Promise<PakPak[]> {
    return invokeGetRecentPaks({
      limit: this.initialLimit,
      cursorId: null,
    }).then((pakTList) => PakPak.fromTList(pakTList));
  }

  protected fetchNext(): Promise<PakPak[]> {
    const lastPak = this.data.items[this.data.items.length - 1];
    return invokeGetRecentPaks({
      limit: this.nextLimit,
      cursorId: lastPak.data.id,
    }).then((pakTList) => PakPak.fromTList(pakTList));
  }
}

export class UserPaksThread extends PaksThread {
  constructor(public user: PakUser) {
    super();
  }

  protected fetchInitial(): Promise<PakPak[]> {
    return invokeGetUserPaks({
      userId: this.user.data.id,
      limit: this.initialLimit,
      cursorId: null,
    }).then((pakTList) => PakPak.fromTList(pakTList));
  }

  protected fetchNext(): Promise<PakPak[]> {
    const lastPak = this.data.items[this.data.items.length - 1];
    return invokeGetUserPaks({
      userId: this.user.data.id,
      limit: this.nextLimit,
      cursorId: lastPak.data.id,
    }).then((pakTList) => PakPak.fromTList(pakTList));
  }
}
