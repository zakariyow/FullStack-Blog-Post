import dotenv from 'dotenv';
dotenv.config();
export const port = process.env.PORT;
export const dbUrl = process.env.DATABASEURL; 
export const jwtSecret = process.env.JWT_SETCTER;
