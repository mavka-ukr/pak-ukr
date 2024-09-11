import { Pak } from "../../../../../database/main/models/Pak.js";
import MakeData from "../../../../../application/MakeData.js";
import { MethodContext } from "../../../../../application/index.js";
import {
  X2Abstract,
  X2Builder,
  X2Concrete,
  X2Param,
} from "@storinka/invoke/x2.js";

class PakTV1Builder extends X2Builder {
  public static makeHavingData(pak: Pak, makeData: MakeData): PakTV1 {
    throw new Error("Not implemented");
  }

  public static makeHavingDataNullable(
    pak: Pak | null,
    makeData: MakeData,
  ): PakTV1 | null {
    return pak ? this.makeHavingData(pak, makeData) : null;
  }

  public static makeListHavingData(paks: Pak[], makeData: MakeData): PakTV1[] {
    return paks.map((pak) => this.makeHavingData(pak, makeData));
  }

  public static async buildMakeData(
    items: Pak[],
    methodContext: MethodContext,
  ): Promise<MakeData> {
    throw new Error("Not implemented");
  }

  public static async make(
    pak: Pak,
    methodContext: MethodContext,
  ): Promise<PakTV1> {
    const makeData = await this.buildMakeData([pak], methodContext);
    return this.makeHavingData(pak, makeData);
  }

  public static async makeNullable(
    pak: Pak | null,
    methodContext: MethodContext,
  ): Promise<PakTV1 | null> {
    return pak ? this.make(pak, methodContext) : null;
  }

  public static async makeList(
    paks: Pak[],
    methodContext: MethodContext,
  ): Promise<PakTV1[]> {
    const makeData = await this.buildMakeData(paks, methodContext);
    return this.makeListHavingData(paks, makeData);
  }
}

@X2Abstract("PakT")
export class PakTV1 extends PakTV1Builder {
  public static makeHavingData(pak: Pak, makeData: MakeData): PakTV1 {
    if (pak.is_deleted) {
      return DeletedPakV1.makeHavingData(pak, makeData);
    }
    return PakV1.makeHavingData(pak, makeData);
  }

  public static async buildMakeData(
    items: Pak[],
    methodContext: MethodContext,
  ): Promise<MakeData> {
    const makeData = new MakeData({ methodContext, pakList: [...items] });
    return makeData;
  }
}

@X2Concrete("DeletedPak")
export class DeletedPakV1 extends PakTV1 {
  @X2Param(Number)
  public id: number;

  public static makeHavingData(pak: Pak, makeData: MakeData): PakTV1 {
    const deletedPak = new DeletedPakV1();
    deletedPak.id = pak.id;
    return deletedPak;
  }
}

@X2Concrete("Pak")
export class PakV1 extends PakTV1 {
  @X2Param(Number)
  public id: number;

  @X2Param(String)
  public name: string;

  @X2Param(String)
  public description: string;

  public static makeHavingData(pak: Pak, makeData: MakeData): PakTV1 {
    const pakV1 = new PakV1();
    pakV1.id = pak.id;
    pakV1.name = pak.name;
    pakV1.description = pak.description;
    return pakV1;
  }
}
