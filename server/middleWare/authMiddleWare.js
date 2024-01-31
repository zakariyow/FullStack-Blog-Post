import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

export const authticationUser = async(req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(403).send("Access Denied! Please Login first❌");
    try {
        const convertedJwt = jwt.verify(token, jwtSecret);
        req.user = convertedJwt;
        next();
    } catch (err) {
        console.log(`${chalk.red.bold("ERR0R AT AUTHORIZARION ")}, ${err}`)
    }
}