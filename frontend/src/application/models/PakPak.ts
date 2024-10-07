import type { PakResult, PakT } from "@/application/invoke/api";
import PakPakVersion from "@/application/models/PakPakVersion";
import PakUser from "@/application/models/PakUser";
import { shallowReactive } from "vue";
import { PakVersionsThread } from "@/application/threads/pakVersions";

const pakPaksStorage = shallowReactive(new Map<number, PakPak>());

function getPakPakFromStorageOrNew(id: number): PakPak {
  const pakPakFromStorage = pakPaksStorage.get(id);
  if (pakPakFromStorage) {
    return pakPakFromStorage;
  }
  const pakPak = new PakPak();
  pakPaksStorage.set(id, pakPak);
  return pakPak;
}

class PakPak {
  public data: {
    id: number;
    deleted: boolean;
    name: string;
    description: string;
    docsUrl: string;
    sourceUrl: string;
    version: PakPakVersion | null;
    author: PakUser;
    logoUrl: string;
  };
  public versionsThread: PakVersionsThread;

  constructor() {
    this.data = {
      id: 0,
      deleted: false,
      name: "",
      description: "",
      docsUrl: "",
      sourceUrl: "",
      version: null,
      author: new PakUser(),
      logoUrl: "",
    };
    this.versionsThread = new PakVersionsThread(this);
  }

  public get CreateVersionURLPath() {
    return encodeURI(`/${this.data.name}/створити-версію`);
  }

  public static findByName(name: string): PakPak | undefined {
    return Array.from(pakPaksStorage.values()).find(
      (pakPak) => pakPak.data.name === name,
    );
  }

  public fillFromPakResult(pakResult: PakResult): void {
    this.data.id = pakResult.id;
    this.data.name = pakResult.name;
    this.data.description = pakResult.description;
    this.data.docsUrl = pakResult.docsUrl;
    this.data.sourceUrl = pakResult.sourceUrl;
    this.data.version = PakPakVersion.fromTNullable(pakResult.version);
    this.data.author = PakUser.fromT(pakResult.author);
    this.data.logoUrl = pakResult.logoUrl;
  }

  public static fromT(pakT: PakT): PakPak {
    const pakPak = getPakPakFromStorageOrNew(pakT.id);
    if (pakT["@"] === "DeletedPak") {
      pakPak.data.deleted = true;
    } else if (pakT["@"] === "Pak") {
      pakPak.fillFromPakResult(pakT);
    } else {
      throw new Error(`Unexpected PakT type: ${pakT["@"]}`);
    }
    return pakPak;
  }

  public static fromTNullable(pakT: PakT | null): PakPak | null {
    if (pakT === null) {
      return null;
    }
    return PakPak.fromT(pakT);
  }

  public static fromTList(pakTList: PakT[]): PakPak[] {
    return pakTList.map(PakPak.fromT);
  }
}

export default PakPak;
