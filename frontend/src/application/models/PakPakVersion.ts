import type { PakVersionResult, PakVersionT } from "@/application/invoke/api";

const pakPakVersionsStorage = new Map<number, PakPakVersion>();

function getPakPakVersionFromStorageOrNew(id: number): PakPakVersion {
  const pakPakFromStorage = pakPakVersionsStorage.get(id);
  if (pakPakFromStorage) {
    return pakPakFromStorage;
  }
  const pakPakVersion = new PakPakVersion();
  pakPakVersionsStorage.set(id, pakPakVersion);
  return pakPakVersion;
}

class PakPakVersion {
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

  public fillFromPakVersionResult(pakVersionResult: PakVersionResult): void {
    this.data.id = pakVersionResult.id;
    this.data.name = pakVersionResult.name;
    this.data.description = pakVersionResult.description;
  }

  public static fromT(pakVersionT: PakVersionT): PakPakVersion {
    const pakPakVersion = getPakPakVersionFromStorageOrNew(pakVersionT.id);
    if (pakVersionT["@"] === "DeletedPakVersion") {
      pakPakVersion.data.deleted = true;
    } else if (pakVersionT["@"] === "PakVersion") {
      pakPakVersion.fillFromPakVersionResult(pakVersionT);
    } else {
      throw new Error(`Unexpected PakVersionT type: ${pakVersionT["@"]}`);
    }
    return pakPakVersion;
  }

  public static fromTNullable(
    pakVersionT: PakVersionT | null,
  ): PakPakVersion | null {
    if (pakVersionT === null) {
      return null;
    }
    return PakPakVersion.fromT(pakVersionT);
  }

  public static fromTList(pakVersionTList: PakVersionT[]): PakPakVersion[] {
    return pakVersionTList.map(PakPakVersion.fromT);
  }
}

export default PakPakVersion;
