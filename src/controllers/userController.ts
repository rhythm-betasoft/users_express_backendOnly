import { Request, Response } from "express";
// import { read, write } from "../utils/fileHandler";
// import { User } from "../models/userModel"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import pool from "../config/db";
const ACCESS_SECRET = process.env.ACCESS_SECRET || "abcde"
const REFRESH_SECRET = process.env.REFRESH_SECRET || "abcde"


class UserController {
  static async allUsers(req: Request, res: Response) {
    // const users: User[] = read();
    // res.json(users);
    const [rows] = await pool.query('SELECT * FROM users');
    return res.status(200).json({ users: rows });
  }
  static async register(req: Request, res: Response) {
    const { name, email, password, confirm } = req.body;
    if (!name || !email || !password || !confirm) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    //   const users: User[] = read()
    //   const existingUser = users.find((user: any) => user.email === email);
    //   if (existingUser) {
    //     return res.json({ message: "Email already registered" });
    //   }
    // const hashedPassword =await bcrypt.hash(password, 10);
    //   const newUser: User = {
    //     id: users.length + 1,
    //     name,
    //     email,
    //     password: hashedPassword,
    //   }
    //   users.push(newUser)
    //   write(users)
    try {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result]: any = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, "user"]
      );

      const newUser = {
        id: result.insertId,
        name,
        email,
        role: "user",
      };
      const accesstoken = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        ACCESS_SECRET,
        { expiresIn: "2m" }
      )

      const refreshtoken = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        REFRESH_SECRET,
        { expiresIn: "1d" }
      )
      return res.status(201).json({ message: "User registered successfully", accesstoken, refreshtoken, user: newUser });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // const users: User[] = read();
    // const user = users.find((u) => u.email === email)

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }
    const [rows]: any = await pool.query('SELECT * FROM users where email = ?', [email]);

    if (rows.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = rows[0]
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
   const accesstoken = jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  ACCESS_SECRET,
  { expiresIn: "2m" }
);

    const refreshtoken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      REFRESH_SECRET,
      { expiresIn: "1d" }
    )
    return res.status(200).json({ message: "Login successful", accesstoken, refreshtoken, user });
  }
  static refresh(req: Request, res: Response) {
    const { refreshtoken } = req.body;
    if (!refreshtoken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
      const decoded = jwt.verify(refreshtoken, REFRESH_SECRET) as { id: number; email: string };
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        ACCESS_SECRET,
        { expiresIn: "2m" }
      );

      return res.status(200).json({ accesstoken: newAccessToken });
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  }
  static profile(req: Request, res: Response) {
    return res.status(200).json({ message: "Hello" });
  }
 static async updateProfile(req: Request, res: Response) {
  const userId = req.params.userId; 
  const { age, gender, religion, blood_group } = req.body;
  if (!age || !gender || !religion || !blood_group) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    console.log(`Attempting to update user profile with ID: ${userId}`);
    const [result]: any = await pool.query(
      'UPDATE users SET age = ?, gender = ?, religion = ?, blood_group = ? WHERE id = ?',
      [age, gender, religion, blood_group, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No user found with the provided ID" });
    }
    return res.status(200).json({ message: "User edited successfully!" });
  } 
  catch (error: any) {
    console.error('Error during database update:', error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}




}
export default UserController