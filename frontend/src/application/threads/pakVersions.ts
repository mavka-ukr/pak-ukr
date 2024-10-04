import PakPak from "@/application/models/PakPak";
import { AbstractInfiniteThread } from "@/application/threads/index";
import { invokeGetPakVersions } from "@/application/invoke/api";
import PakPakVersion from "@/application/models/PakPakVersion";

export class PakVersionsThread extends AbstractInfiniteThread<PakPakVersion> {
  constructor(public pak: PakPak) {
    super();
  }

  protected fetchInitial(): Promise<PakPakVersion[]> {
    return invokeGetPakVersions({
      pakId: this.pak.data.id,
      limit: this.initialLimit,
      cursorId: null,
    }).then((pakVersionTList) => PakPakVersion.fromTList(pakVersionTList));
  }

  protected fetchNext(): Promise<PakPakVersion[]> {
    const lastPakVersion = this.data.items[this.data.items.length - 1];
    return invokeGetPakVersions({
      pakId: this.pak.data.id,
      limit: this.nextLimit,
      cursorId: lastPakVersion.data.id,
    }).then((pakVersionTList) => PakPakVersion.fromTList(pakVersionTList));
  }
}
