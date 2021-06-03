export const getContentType = (headers: Record<string, string>) => {
  return (
    headers["content-type"] ||
    headers["Content-Type"] ||
    ""
  ).toLowerCase();
};

export function isJSONContentType(headers: Record<string, string>): boolean {
  return getContentType(headers).toLowerCase().includes("application/json");
}

export function isHTMLContentType(headers: Record<string, string>): boolean {
  return getContentType(headers).toLowerCase().includes("text/html");
}

export function isFormUrlEncodedContentType(
  headers: Record<string, string>
): boolean {
  return getContentType(headers)
    .toLowerCase()
    .includes("x-www-form-urlencoded");
}
