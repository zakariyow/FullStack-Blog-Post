import chalk from "chalk";
import mongoose from "mongoose";
import { dbUrl } from "./config.js";

const connectToDatabase = async() => {
    try {
        mongoose.connect(dbUrl);
        console.log(`${chalk.green.bold('Connected')} to the DATABASE ✅`)
    } catch (err) {
        console.log(`${chalk.red.bold('ERROR At Database Connection')}, ${err}`)
    }
}

export default connectToDatabase;