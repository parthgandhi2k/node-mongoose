import { connect, connection } from "mongoose";

import { APP_CONFIG } from "../config";

export const connectDB = () => connect(APP_CONFIG.DB_URL);

connection.on('connected', () => console.log('Database connected...'));

connection.on('disconnected', () => {
    console.log('Database disconnected...');
    process.exit(1);
});
