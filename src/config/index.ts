import { config } from 'dotenv';
import { cleanEnv, port, url, str, num } from 'envalid';

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const APP_CONFIG = cleanEnv(process.env, {
    PORT: port({
        devDefault: 5000,
        desc: "Port on which app should run"
    }),
    DB_URL: url({ desc: "database connection string" }),
    JWT_SECRET: str({ desc: "JWT secret for signing and verifying token" }),
    SALT_ROUNDS: num({ devDefault: 10, desc: "Salt rounds to hash passwords" }),
});
