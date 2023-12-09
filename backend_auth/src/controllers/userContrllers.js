import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = 'yourSecretKey';
// ** For SignUp New user **
const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let emailExistInDatabase;

    try {
        emailExistInDatabase = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }

    if (emailExistInDatabase) {
        return res.status(400).json({
            message: "Email already exists",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }

    res.status(201).json({
        message: user,
    });
};

// ** For Login Existing user **
const login = async (req, res, next) => {
    const { email, password } = req.body;

    let user;

    try {
        user = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, secretKey, {
        expiresIn: 3600,
    });
    res.status(200).json({ message: "Login successful", user, token });
};


const varifyToken = (req, res, next) => {
    const headers = req.headers[`authorization`];
    const token = headers.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "No token Found",
        });
    }
    jwt.verify(String(token), secretKey, (err, user) => {
        if (err) {
          return res.status(400).json({ message: "Invalid TOken" });
        }
        console.log(user?.id);
        req.id = user.id;
    });
    next();
};

const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
      user = await User.findById(userId, "-password");
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
  };

export const Signup = signup;
export const Login = login;
export const VarifyToken = varifyToken;
export const GetUser = getUser;
