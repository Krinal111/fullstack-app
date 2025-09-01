import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;

export const DB = {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_URL: process.env.DATABASE_URL,
};

export const jwtCreds = {
  secretKeyJwt: process.env.JWT_KEY,
  sessionTime: process.env.JWT_SESSION || "2h",
  refreshSessionTime: "7d",
};
