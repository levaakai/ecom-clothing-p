import bcrypt from 'bcrypt'
// import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { mail } from '../utils/mailer.js';
import { where } from 'sequelize';
import { User } from '../config/db.js';



export const registerUser = async (req, res) => {
    const { firstName, lastName, email, telephone, address, password } = req.body;
    let errors = [];

    // Validation checks
    if (!firstName || !lastName || !email || !telephone || !password, !address) {
        errors.push("All fields must be provided");
    }
    
    if (firstName.length < 3) {
        errors.push("First name must be at least 3 characters");
    }
    if (lastName.length < 3) {
        errors.push("Last name must be at least 3 characters");
    }
    if (telephone.length !== 10) {
        errors.push("Telephone number must be 10 digits");
    }
    if (!address.length) {
      errors.push("Address must be provided");
  }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }

    // If there are any errors, return them to the client
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    try {
        const user = await User.create({ firstName, lastName, email, telephone,address, password: hashedPassword });

        //  storing cookie
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, 
                    userid: user.id, 
                    username: user.firstName
                }, 
                    process.env.JWTSECRET
            );
            
            res.cookie("ecom_clothing", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24
            })

        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // store JWT cookie
      const token = jwt.sign(
        {
          userid: user.id,
          username: user.firstName
        },
        process.env.JWTSECRET,
        { expiresIn: '1d' }
      );
  
      // Set cookie
      res.cookie("ecom_clothing", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 
      });
  
      // Send success response
      res.status(200).json({ message: "User login successful" });
  
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

export const logoutUser = async (req, res) => {
    res.clearCookie('ecom_clothing')
    return res.status(200).json({message: "User logged out"})
}



/** Actions:
    Check if a user with the given email exists.
    Generate a secure token (JWT or a random string).
    Save the token in DB or attach it to the user record with an expiration.
    Send an email with a reset link:

    **/


export const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ where: { email }})
    
    if ( user.dataValues.email === email ){
      const mailToken = jwt.sign(
        { userId: user.id },
        process.env.EMAILTOKI,
        { expiresIn: '1h' }
      );
      
      const resetLink = `http://localhost:5000/api/auth/reset-password/${mailToken}`;
    await mail(resetLink);

    }
    return res.status(200).json({message: "Password reset link sent."})
  } catch (err) {
    return res.status(500).json({message: "Password reset unsuccessful"})
  }
}

export const resetPassword = async (req, res) => {
  try {
    const newPassword = req.body.newPassword
    const decoded = jwt.verify(req.query.token, process.env.EMAILTOKI)
    const user = await User.findOne({ where: { id: decoded.userId } })

    console.log('new pasword is ', newPassword);
    console.log('token is ', req.query.token);
    // console.log("user is ", user);

    if (!user){
      return res.status(404).json({ message:"User not found"})
    }

    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(newPassword, saltRounds)
    await User.update({ password: passwordHashed}, {where: { id: user.id }})

    return res.status(200).json({message: "Reset Password"})
  } catch (err) {
    return res.status(500).json({message: "Password reset unsuccessful"})
  }
}
