export const GetToken = (request: Request) => {
  return request.headers.get("Authorization")?.split(" ")[1];
};
