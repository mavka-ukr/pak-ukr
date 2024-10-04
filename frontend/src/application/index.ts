import { shallowReactive } from "vue";
import type { AccountT } from "@/application/invoke/api";
import { invokeCreatePak, invokeFindPakByName } from "@/application/invoke/api";
import type PakUser from "@/application/models/PakUser";
import { RecentPaksThread } from "@/application/threads/paks";
import PakPak from "@/application/models/PakPak";

export const Pak = shallowReactive<{
  me?: {
    account: AccountT;
    user: PakUser;
  };
  recentPaksThread: RecentPaksThread;
  createPak: (params: {
    name: string;
    description: string;
    docsUrl: string;
    sourceUrl: string;
  }) => Promise<PakPak>;
  fetchPakByName: (params: { name: string }) => Promise<PakPak | null>;
}>({
  recentPaksThread: new RecentPaksThread(),
  createPak: async (params) => PakPak.fromT(await invokeCreatePak(params)),
  fetchPakByName: async (params) =>
    PakPak.fromTNullable(await invokeFindPakByName(params)),
});
