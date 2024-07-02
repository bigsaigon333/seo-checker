import { Result } from "./models";
import { client } from "./network";

export async function submitForm(payload: { url: string }) {
  return await client
    .get("check", { searchParams: payload })
    .json<{ ok: boolean; data: Result[] }>();
}
