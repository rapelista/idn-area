import { ParamsType } from "~/types/uri";

export function generateApiUrl(context: string, params?: ParamsType) {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL!);

  url.pathname = url.pathname + "/" + context;
  url.pathname = url.pathname.replace(/\/+/g, "/");

  if (params) {
    url.search = generateApiParams(params);
  }

  return url.toString();
}

export function generateApiParams(params: ParamsType) {
  const url = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value || typeof value === "boolean") {
      if (Array.isArray(value)) {
        value.forEach((v) => url.append(key, String(v)));
      } else {
        url.append(key, String(value));
      }
    }
  });

  return url.toString();
}
