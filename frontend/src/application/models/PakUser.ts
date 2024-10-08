import type { UserResult, UserT } from "@/application/invoke/api";
import { PaksThread, UserPaksThread } from "@/application/threads/paks";
import { shallowReactive } from "vue";

const pakUsersStorage = shallowReactive(new Map<number, PakUser>());

function getPakUserFromStorageOrNew(id: number): PakUser {
  const pakUserFromStorage = pakUsersStorage.get(id);
  if (pakUserFromStorage) {
    return pakUserFromStorage;
  }
  const pakUser = new PakUser();
  pakUsersStorage.set(id, pakUser);
  return pakUser;
}

class PakUser {
  public data: {
    id: number;
    name: string;
    username: string;
    avatarUrl: string | null;
  };
  public paksThread: PaksThread;

  constructor() {
    this.data = {
      id: 0,
      name: "",
      username: "",
      avatarUrl: null,
    };
    this.paksThread = new UserPaksThread(this);
  }

  public static findByUsername(username: string): PakUser | undefined {
    return Array.from(pakUsersStorage.values()).find(
      (pakUser) => pakUser.data.username === username,
    );
  }

  public fillFromUserResult(userResult: UserResult): void {
    this.data.id = userResult.id;
    this.data.name = userResult.name;
    this.data.username = userResult.username;
    this.data.avatarUrl = userResult.avatarUrl;
  }

  public static fromT(userT: UserT): PakUser {
    const pakUser = getPakUserFromStorageOrNew(userT.id);
    if (userT["@"] === "User") {
      pakUser.fillFromUserResult(userT);
    } else {
      throw new Error(`Unexpected UserT type: ${userT["@"]}`);
    }
    return pakUser;
  }

  public static fromTNullable(userT: UserT | null): PakUser | null {
    if (userT === null) {
      return null;
    }
    return PakUser.fromT(userT);
  }

  public static fromTList(userTList: UserT[]): PakUser[] {
    return userTList.map(PakUser.fromT);
  }
}

export default PakUser;
