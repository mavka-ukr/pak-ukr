import type { PakResult, PakT } from "@/application/invoke/api";

const pakPaksStorage = new Map<number, PakPak>();

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
  };

  constructor() {
    this.data = {
      id: 0,
      deleted: false,
      name: "",
      description: "",
    };
  }

  public fillFromPakResult(pakResult: PakResult): void {
    this.data.id = pakResult.id;
    this.data.name = pakResult.name;
    this.data.description = pakResult.description;
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
