export async function request(url: URL | string, options?: RequestInit) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  switch (response.status) {
    case 204:
      return;
    default:
      return await response.json();
  }
}
