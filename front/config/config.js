export const backUrl =
  process.env.NODE_ENV === "production"
    ? // ? "https://api.dev-life.kr/"
      "http://localhost:3065/"
    : "http://localhost:3065/";
