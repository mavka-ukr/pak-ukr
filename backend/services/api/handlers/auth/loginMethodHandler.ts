import { GuestMethodContext } from "../../../../application/index.js";
import { getMavkaTokenByCode, getMavkaUserByToken } from "../../../../application/mavka.js";
import { dbFindUserByMavkaId } from "../../../../database/main/repositories/users.js";
import { SessionDb } from "../../../../database/main/models/Session.js";
import { randomString } from "../../../../application/utils/random.js";
import { UserDb } from "../../../../database/main/models/User.js";
import mainDb from "../../../../database/main/index.js";

async function loginMethodHandler(
  params: { mavkaCode: string },
  context: GuestMethodContext
): Promise<string> {
  const mavkaToken = await getMavkaTokenByCode(params.mavkaCode);
  const mavkaUser = await getMavkaUserByToken(mavkaToken);
  let user = await dbFindUserByMavkaId(mavkaUser.id);
  return mainDb.transaction(async (trx) => {
    if (user) {
      await UserDb.update(
        user,
        {
          father_name: mavkaUser.father_name,
          first_name: mavkaUser.first_name,
          family_name: mavkaUser.family_name,
          avatar_url: mavkaUser.avatar_url
        },
        trx
      );
    } else {
      user = await UserDb.save(
        {
          mavka_id: mavkaUser.id,
          father_name: mavkaUser.father_name,
          first_name: mavkaUser.first_name,
          family_name: mavkaUser.family_name,
          avatar_url: mavkaUser.avatar_url,
          posts_count: 0,
          rating: 0
        },
        trx
      );
    }
    const session = await SessionDb.save(
      {
        user_id: user.id,
        token: `${user.id}.${randomString(32)}`
      },
      trx
    );
    return session.token;
  });
}

export default loginMethodHandler;
