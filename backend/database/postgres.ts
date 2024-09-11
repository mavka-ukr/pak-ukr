import pg from "pg";
import knex, { Knex } from "knex";
import { PAK_ERROR_RECORD_NOT_FOUND } from "../application/errors.js";

pg.types.setTypeParser(pg.types.builtins.INT8, Number);
pg.types.setTypeParser(pg.types.builtins.INT2, Number);
pg.types.setTypeParser(pg.types.builtins.INT4, Number);
pg.types.setTypeParser(pg.types.builtins.FLOAT4, Number);
pg.types.setTypeParser(pg.types.builtins.FLOAT8, Number);

export interface Model {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export type SaveModel<T extends Model> = Omit<T, keyof Model> & Partial<Model>;

export function paginateQuery<T>(
  query: T,
  limit: number,
  cursorId: number | null,
  orderBy: string = "id",
  order: "asc" | "desc" = "desc",
  additionalOrderBy: string | null = null,
  additionalOrder: "asc" | "desc" = "desc",
): T {
  query = (query as any).limit(limit).orderBy(orderBy, order);
  if (additionalOrderBy) {
    query = (query as any).orderBy(additionalOrderBy, additionalOrder);
  }
  if (cursorId) {
    query = (query as any).where(
      orderBy,
      order === "desc" ? "<" : ">",
      cursorId,
    );
  }
  return query;
}

export function commonDb<T extends Model>(
  db: knex.Knex,
  tableName: string,
  options: { notFoundException?: Error } = {},
) {
  options.notFoundException =
    options.notFoundException || PAK_ERROR_RECORD_NOT_FOUND;
  const fns = {
    query(trx?: Knex.Transaction) {
      if (trx) {
        return db<T>(tableName).transacting(trx);
      }
      return db<T>(tableName);
    },
    async findById(id: number, trx?: Knex.Transaction) {
      return fns.query(trx).where("id", id).first();
    },
    async findByIdOrFail(id: number, trx?: Knex.Transaction) {
      const result = await fns.findById(id, trx);
      if (!result) {
        throw options.notFoundException;
      }
      return result;
    },
    findManyByIds(ids: number[], trx?: Knex.Transaction) {
      return fns.query(trx).whereIn("id", ids);
    },
    async findManyByIn(column: string, values: any[], trx?: Knex.Transaction) {
      return fns.query(trx).whereIn(column, values);
    },
    async findManyBy(column: string, value: any, trx?: Knex.Transaction) {
      return fns.query(trx).where(column, value);
    },
    async findManyByObject(obj: Record<string, any>, trx?: Knex.Transaction) {
      return fns.query(trx).where(obj);
    },
    async deleteById(id: number, trx?: Knex.Transaction): Promise<void> {
      await fns.query(trx).where("id", id).delete();
    },
    async save(data: SaveModel<T>, trx?: Knex.Transaction): Promise<T> {
      data.updated_at = new Date();
      if (data.id) {
        let query = fns
          .query(trx)
          .where("id", data.id)
          .update(data as any);
        await query;
      } else {
        data.created_at = new Date();
        let query = fns
          .query(trx)
          .insert(data as any)
          .returning("id");
        const [resultData] = await query;
        data.id = (resultData as any).id as number;
      }
      return data as T;
    },
    async updateById(
      id: number,
      data: Partial<T>,
      trx?: Knex.Transaction,
    ): Promise<void> {
      data.updated_at = new Date();
      let query = fns
        .query(trx)
        .where("id", id)
        .update({
          ...data,
          id: undefined,
        } as any);
      await query;
    },
    async update(
      value: T,
      data: Partial<T>,
      trx?: Knex.Transaction,
    ): Promise<T> {
      data.updated_at = new Date();
      let query = fns
        .query(trx)
        .where("id", value.id)
        .update({
          ...data,
          id: undefined,
        } as any);
      await query;
      for (const key in data) {
        (value as any)[key] = (data as any)[key];
      }
      return value;
    },
  };
  return fns;
}
