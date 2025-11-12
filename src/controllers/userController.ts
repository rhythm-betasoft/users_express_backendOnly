import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as QRCode from 'qrcode';

import { transporter } from "../utils/mail";
import TwoFA from "2fa-node";
const ACCESS_SECRET = process.env.ACCESS_SECRET || "abcde";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "abcde";

const userRepository = AppDataSource.getRepository(User);

class UserController {
  async allUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.find({
        select: ["id", "name", "email", "role", "age", "gender", "religion", "blood_group"]
      });
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    } 
  }

      async register(req: Request, res: Response) {
        const { name, email, password, confirm } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
        if (confirm && password !== confirm) return res.status(400).json({ message: "Passwords do not match" });
        try {
          const existingUser = await userRepository.findOneBy({ email });
          if (existingUser) return res.status(400).json({ message: "Email already registered" });
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = userRepository.create({ name, email, password: hashedPassword, role: "user" });                                                                                                                                                                                                                                                                                               
          const savedUser = await userRepository.save(newUser); 
          const accesstoken = jwt.sign({ id: savedUser.id, email: savedUser.email, role: savedUser.role }, ACCESS_SECRET, { expiresIn: "2m" });
          const refreshtoken = jwt.sign({ id: savedUser.id, email: savedUser.email, role: savedUser.role }, REFRESH_SECRET, { expiresIn: "1d" });
          await transporter.sendMail({
          from: `"Betasoft Solutions" <${process.env.EMAIL_USER}>`,
          to: savedUser.email,
          subject: "Welcome to Betasoft Solutions!",
          html: `<h3>Hello ${savedUser.name},</h3><p>Thanks for registering! Welcome to th family!!!!.</p>`,
        });
          return res.status(201).json({ message: "User registered successfully", accesstoken, refreshtoken, user: savedUser });
        } catch (err) {
          return res.status(500).json({ message: "Server error" });
        }
      }
                                                                                                                                                                                                                                
      async login(req: Request, res: Response) {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Email and password are required" });

      try {
        const user = await userRepository.findOneBy({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid password" });


      if (user.flag ){
          const payload = { name: user.name, email: user.email };

      
          const { secret, uri } = await TwoFA.generateSecret(payload as any);

          user.twoFactorSecret = secret;
          await userRepository.save(user);

          const qr = await QRCode.toDataURL(uri);
          return res.status(200).json({
            message: "2FA setup required (regenerated due to flag=1)",
            qr,
            otpauthUrl: uri
          });
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
        );

        return res.status(200).json({
          message: "Login successful",
          accesstoken,
          refreshtoken,
          user
        });
      } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
      }
    }



    async verifyTwoFA(req: Request, res: Response) {
      const { userId, code } = req.body;

      if (!userId || !code) 
        return res.status(400).json({ message: "userId and code are required" });

      try {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!user.twoFactorSecret) 
          return res.status(400).json({ message: "2FA is not enabled for this user" });

        const isValid = TwoFA.verifyToken(user.twoFactorSecret, code);

        if (!isValid) 
          return res.status(400).json({ success: false, message: "Invalid OTP code" });

        return res.status(200).json({ success: true, message: "2FA verified successfully" });
      } catch (err) {
        console.error("2FA verification error:", err);
        return res.status(500).json({ message: "Server error" });
      }
    }





  refresh(req: Request, res: Response) {
    const { refreshtoken } = req.body;
    if (!refreshtoken) return res.status(401).json({ message: "No refresh token provided" });
    try {
      const decoded = jwt.verify(refreshtoken, REFRESH_SECRET) as { id: number; email: string };
      const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, ACCESS_SECRET, { expiresIn: "2m" });
      console.log(newAccessToken)
      return res.status(200).json({ accesstoken: newAccessToken });
    }
     catch {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  }

  profile(req: Request, res: Response) {
    return res.status(200).json({ message: "Hello" });
  }
  async updateProfile(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const { age, gender, religion, blood_group } = req.body;
    if (!age || !gender || !religion || !blood_group) return res.status(400).json({ message: "All fields are required" });
    try {
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) return res.status(404).json({ message: "User not found" });
      user.age = age;
      user.gender = gender;
      user.religion = religion;
      user.blood_group = blood_group;
      await userRepository.save(user);
      return res.status(200).json({ message: "User profile updated successfully", user });
    } 
    catch (err: any) {
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}

export default UserController;





// import { Request, Response } from "express";
// // import { read, write } from "../utils/fileHandler";
// // import { User } from "../models/userModel"
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'
// import pool from "../config/db";
// const ACCESS_SECRET = process.env.ACCESS_SECRET || "abcde"
// const REFRESH_SECRET = process.env.REFRESH_SECRET || "abcde"


// class UserController {
//   async allUsers(req: Request, res: Response) {
//     // const users: User[] = read();
//     // res.json(users);
//     const [rows] = await pool.query('SELECT * FROM users');
//     return res.status(200).json({ users: rows });
//   }
//  async register(req: Request, res: Response) {
//     const { name, email, password, confirm } = req.body;
//     if (!name || !email || !password ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     if(confirm!==undefined){
//     if (password !== confirm) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }
//   }
//     //   const users: User[] = read()
//     //   const existingUser = users.find((user: any) => user.email === email);
//     //   if (existingUser) {
//     //     return res.json({ message: "Email already registered" });
//     //   }
//     // const hashedPassword =await bcrypt.hash(password, 10);
//     //   const newUser: User = {
//     //     id: users.length + 1,
//     //     name,
//     //     email,
//     //     password: hashedPassword,
//     //   }
//     //   users.push(newUser)
//     //   write(users)
//     try {
//       const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//       if (rows.length > 0) {
//         return res.status(400).json({ message: "Email already registered" });
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const [result]: any = await pool.query(
//         'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
//         [name, email, hashedPassword, "user"]
//       );

//       const newUser = {
//         id: result.insertId,
//         name,
//         email,
//         role: "user",
//       };
//       const accesstoken = jwt.sign(
//         { id: newUser.id, email: newUser.email, role: newUser.role },
//         ACCESS_SECRET,
//         { expiresIn: "2m" }
//       )

//       const refreshtoken = jwt.sign(
//         { id: newUser.id, email: newUser.email, role: newUser.role },
//         REFRESH_SECRET,
//         { expiresIn: "1d" }
//       )
//       return res.status(201).json({ message: "User registered successfully", accesstoken, refreshtoken, user: newUser });
//     }
//     catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Server error" });
//     }
//   }
//  async login(req: Request, res: Response) {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }
//     // const users: User[] = read();
//     // const user = users.find((u) => u.email === email)

//     // if (!user) {
//     //   return res.status(404).json({ message: "User not found" });
//     // }
//     // const isPasswordValid = await bcrypt.compare(password, user.password);
//     // if (!isPasswordValid) {
//     //   return res.status(401).json({ message: "Invalid password" });
//     // }
//     const [rows]: any = await pool.query('SELECT * FROM users where email = ?', [email]);

//     if (rows.length == 0) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const user = rows[0]
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }
//    const accesstoken = jwt.sign(
//   { id: user.id, email: user.email, role: user.role },
//   ACCESS_SECRET,
//   { expiresIn: "2m" }
// );

//     const refreshtoken = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       REFRESH_SECRET,
//       { expiresIn: "1d" }
//     )
//     return res.status(200).json({ message: "Login successful", accesstoken, refreshtoken, user });
//   }
//   refresh(req: Request, res: Response) {
//     const { refreshtoken } = req.body;
//     if (!refreshtoken) {
//       return res.status(401).json({ message: "No refresh token provided" });
//     }
//     try {
//       const decoded = jwt.verify(refreshtoken, REFRESH_SECRET) as { id: number; email: string };
//       const newAccessToken = jwt.sign(
//         { id: decoded.id, email: decoded.email },
//         ACCESS_SECRET,
//         { expiresIn: "2m" }
//       );

//       return res.status(200).json({ accesstoken: newAccessToken });
//     } catch (err) {
//       return res.status(403).json({ message: "Invalid or expired refresh token" });
//     }
//   }
//  profile(req: Request, res: Response) {
//     return res.status(200).json({ message: "Hello" });
//   }
//  async updateProfile(req: Request, res: Response) {
//   const userId = req.params.userId; 
//   const { age, gender, religion, blood_group } = req.body;
//   if (!age || !gender || !religion || !blood_group) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   try {
//     console.log(`Attempting to update user profile with ID: ${userId}`);
//     const [result]: any = await pool.query(
//       'UPDATE users SET age = ?, gender = ?, religion = ?, blood_group = ? WHERE id = ?',
//       [age, gender, religion, blood_group, userId]
//     );
//     if (result.affectedRows === 0) {
//       return res.status(400).json({ message: "No user found with the provided ID" });
//     }
//     return res.status(200).json({ message: "User edited successfully!" });
//   } 
//   catch (error: any) {
//     console.error('Error during database update:', error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// }




// }
// export default UserController