import ky from "ky";

const IS_DEV = process.env.NODE_ENV === "development";
const API_HOSTNAME = "https://api.bigsaigon333.me";

export const client = ky.create({
  prefixUrl: (IS_DEV ? "" : API_HOSTNAME) + "/api",
  retry: 0,
});
