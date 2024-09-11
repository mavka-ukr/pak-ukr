import { shallowReactive } from "vue";
import type { AccountT } from "@/application/invoke/api";
import { invokeCreatePak } from "@/application/invoke/api";
import type PakUser from "@/application/models/PakUser";
import { RecentPaksThread } from "@/application/threads/paks";
import PakPak from "@/application/models/PakPak";

export const Pak = shallowReactive<{
  me?: {
    account: AccountT;
    user: PakUser;
  };
  recentPaksThread: RecentPaksThread;
  createPak: (params: { name: string; description: string }) => Promise<PakPak>;
}>({
  recentPaksThread: new RecentPaksThread(),
  createPak: async (params) => PakPak.fromT(await invokeCreatePak(params)),
});
