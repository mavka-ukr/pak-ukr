import { shallowReactive } from "vue";
import {
  type AccountT,
  invokeCreatePak,
  invokeCreatePakVersion,
  invokeFindPakByName,
} from "@/application/invoke/api";
import type PakUser from "@/application/models/PakUser";
import { RecentPaksThread } from "@/application/threads/paks";
import PakPak from "@/application/models/PakPak";
import PakPakVersion from "@/application/models/PakPakVersion";

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
  createPakVersion: (
    pakId: number,
    params: {
      name: string;
      description: string;
      fileId: number;
    },
  ) => Promise<PakPakVersion>;
}>({
  recentPaksThread: new RecentPaksThread(),
  createPak: async (params) => PakPak.fromT(await invokeCreatePak(params)),
  fetchPakByName: async (params) =>
    PakPak.fromTNullable(await invokeFindPakByName(params)),
  createPakVersion: async (pakId, params) =>
    PakPakVersion.fromT(await invokeCreatePakVersion({ pakId, ...params })),
});
