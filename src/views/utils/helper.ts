export const getContentType = (headers: Record<string, string>) => {
  return (
    headers["content-type"] ||
    headers["Content-Type"] ||
    ""
  ).toLowerCase();
};
