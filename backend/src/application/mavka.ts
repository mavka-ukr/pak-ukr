import axios from "axios";

export interface MavkaUser {
  id: number;
  father_name: string;
  first_name: string;
  family_name: string;
  family_mother_name: string;
  avatar_url: string | null;
}

export async function getMavkaUserByToken(token: string): Promise<MavkaUser> {
  const me = await axios
    .get("https://я.мавка.укр/api/getMe", {
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
          father_name?: string;
          name?: string;
          family_name?: string;
          family_mother_name?: string;
          photo_url?: string | null;
          email?: string;
        },
    );
  if (!me.id) {
    throw new Error("Invalid me response");
  }
  return {
    id: me.id,
    father_name: me.father_name || "",
    first_name: me.name || "",
    family_name: me.family_name || "",
    family_mother_name: me.family_mother_name || "",
    avatar_url: me.photo_url || null,
  };
}

export async function getMavkaTokenByCode(
  code: string,
  redirectUri: string,
): Promise<string> {
  const token = await axios
    .postForm("https://я.мавка.укр/oauth/token", {
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
