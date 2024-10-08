import axios from "axios";

export interface MavkaUser {
  id: number;
  name: string;
  avatar_url: string | null;
}

export async function getMavkaUserByToken(token: string): Promise<MavkaUser> {
  const me = await axios
    .get("https://паспорт.мавка.укр/api/getMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(
      (response) =>
        response.data as {
          "@": "Me";
          type: "person";
          id?: number;
          name?: string;
          photo_url?: string | null;
          email?: string;
        },
    );
  if (!me.id) {
    throw new Error("Invalid me response");
  }
  return {
    id: me.id,
    name: me.name || "",
    avatar_url: me.photo_url || null,
  };
}

export async function getMavkaTokenByCode(
  code: string,
  redirectUri: string,
): Promise<string> {
  const token = await axios
    .postForm("https://паспорт.мавка.укр/oauth/token", {
      grant_type: "authorization_code",
      client_id: "1",
      client_secret: "WiJQV1jLw3gNnCgIPDtEaTA01ZyntnkqLr3PKuGD",
      redirect_uri: redirectUri,
      code,
    })
    .then((response) => response.data.access_token);
  console.log(token);
  return token;
}
