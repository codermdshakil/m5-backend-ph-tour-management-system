import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_TOKEN: string;
  JWT_ACCESS_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
}

const loadEnvVariable = (): EnvConfig => {
  const requiredEngVariable: string[] = ["PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_TOKEN", "JWT_ACCESS_EXPIRES", "BCRYPT_SALT_ROUND"];
  requiredEngVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}!!`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  };
};

export const envVars: EnvConfig = loadEnvVariable();
