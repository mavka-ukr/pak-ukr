import MakeData from "../../../../../application/MakeData.js";
import { MethodContext } from "../../../../../application/index.js";
import {
  X2Abstract,
  X2Builder,
  X2Concrete,
  X2Param,
} from "@storinka/invoke/x2.js";
import { PakVersion } from "../../../../../database/main/models/PakVersion.js";

class PakVersionTV1Builder extends X2Builder {
  public static makeHavingData(
    pakVersion: PakVersion,
    makeData: MakeData,
  ): PakVersionTV1 {
    throw new Error("Not implemented");
  }

  public static makeHavingDataNullable(
    pakVersion: PakVersion | null,
    makeData: MakeData,
  ): PakVersionTV1 | null {
    return pakVersion ? this.makeHavingData(pakVersion, makeData) : null;
  }

  public static makeListHavingData(
    pakVersions: PakVersion[],
    makeData: MakeData,
  ): PakVersionTV1[] {
    return pakVersions.map((pak) => this.makeHavingData(pak, makeData));
  }

  public static async buildMakeData(
    items: PakVersion[],
    methodContext: MethodContext,
  ): Promise<MakeData> {
    throw new Error("Not implemented");
  }

  public static async make(
    pakVersion: PakVersion,
    methodContext: MethodContext,
  ): Promise<PakVersionTV1> {
    const makeData = await this.buildMakeData([pakVersion], methodContext);
    return this.makeHavingData(pakVersion, makeData);
  }

  public static async makeNullable(
    pakVersion: PakVersion | null,
    methodContext: MethodContext,
  ): Promise<PakVersionTV1 | null> {
    return pakVersion ? this.make(pakVersion, methodContext) : null;
  }

  public static async makeList(
    pakVersions: PakVersion[],
    methodContext: MethodContext,
  ): Promise<PakVersionTV1[]> {
    const makeData = await this.buildMakeData(pakVersions, methodContext);
    return this.makeListHavingData(pakVersions, makeData);
  }
}

@X2Abstract("PakVersionT")
export class PakVersionTV1 extends PakVersionTV1Builder {
  public static makeHavingData(
    pakVersion: PakVersion,
    makeData: MakeData,
  ): PakVersionTV1 {
    if (pakVersion.is_deleted) {
      return DeletedPakVersionV1.makeHavingData(pakVersion, makeData);
    }
    return PakVersionV1.makeHavingData(pakVersion, makeData);
  }

  public static async buildMakeData(
    items: PakVersion[],
    methodContext: MethodContext,
  ): Promise<MakeData> {
    const makeData = new MakeData({
      methodContext,
      pakVersionList: [...items],
    });
    return makeData;
  }
}

@X2Concrete("DeletedPakVersion")
export class DeletedPakVersionV1 extends PakVersionTV1 {
  @X2Param(Number)
  public id: number;

  public static makeHavingData(
    pakVersion: PakVersion,
    makeData: MakeData,
  ): PakVersionTV1 {
    const deletedPak = new DeletedPakVersionV1();
    deletedPak.id = pakVersion.id;
    return deletedPak;
  }
}

@X2Concrete("PakVersion")
export class PakVersionV1 extends PakVersionTV1 {
  @X2Param(Number)
  public id: number;

  @X2Param(Number)
  public pakId: number;

  @X2Param(String)
  public name: string;

  @X2Param(String)
  public description: string;

  public static makeHavingData(
    pakVersion: PakVersion,
    makeData: MakeData,
  ): PakVersionTV1 {
    const pakVersionV1 = new PakVersionV1();
    pakVersionV1.id = pakVersion.id;
    pakVersionV1.pakId = pakVersion.pak_id;
    pakVersionV1.name = pakVersion.name;
    pakVersionV1.description = pakVersion.description;
    return pakVersionV1;
  }
}
