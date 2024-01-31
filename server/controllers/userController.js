import bcrypt from "bcrypt";
import User from "../model/user.js";
import chalk from "chalk";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/config.js";

export const getUserAll = async(req, res) => {
  res.send({ status: true, message: "Successfully logged in" });
};

export const registerUser = async (req, res) => {
  const {username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExits = await User.findOne({
      $or: [{username: username.toLowerCase()}, {email: email.toLowerCase()}],
    });
    
    if (userExits) {
      if (userExits.username == username.toLowerCase()) {
        return res.status(400).send("This Username already teked!");
      } else if (userExits.email == email.toLowerCase()) {
        return res.status(400).send("This Email already teked!");
      }
    }

    const user = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
    console.log(`${chalk.red.bold(err.message)}`);
  }
};

export const loginUser = async(req, res) =>{
  const {username, password} = req.body;
  try{
    const userExit= await User.findOne({username: username.toLowerCase()});
    if(!userExit) return res.status(403).send("Username or password are incorrect!");

    const validPassword = await bcrypt.compare(password, userExit.password);
    if(!validPassword) return res.status(403).send("Username or password are incorrect!");

    const token = jwt.sign({_id: userExit._id},jwtSecret);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1 * 24* 60 * 60 * 1000, // 1 day
      secure: false,
    })

    userExit.password = undefined;
    res.status(200).send(userExit);

  } catch(err){
    res.status(400).send("UnKnow Error At Login");
    console.log(`${chalk.red.bold('UnKnow Error At Login')}, ${err}`)
  }
}

export const getUserProfile = async(req, res) =>{
  try{
    const user = await User.findById(req.user._id);
    user.password = undefined;
    return res.status(200).send(user);
  }catch(err){
    console.log(`${chalk.red.bold("ERROR AT Get user Profile ")}, ${err}`)
  }
}

export const logoutUser = async(req, res) =>{
  try{
    res.clearCookie('token');
    return res.status(200).send("Successfully Logout.")
  }catch(err){
    console.log(`${chalk.red.bold("ERROR At Logout ")}, ${err}`)
  }
}