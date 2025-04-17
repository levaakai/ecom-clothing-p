/******** USER ROUTES */
/////////   user profile [view] ( GET | POST )
// GET user profile || UPDATE user profile

/** 
 * 
 * getUserProfile
*  updateUserProfile
*  changePassword
getAllUsers (admin)
getUserById (admin)
deleteUser (admin or self)
 */
import jwt from "jsonwebtoken";
// import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { User } from '../config/db.js';


const requestUserToken = (req, res) => {
     // first get token and check if token is present
     const token = req.cookies.ecom_clothing
     if (!token) {
        return res.status(401).json({error: "Unauthorized. Token not found."})
     }

     // verify token validity
     const decoded = jwt.verify(token, process.env.JWTSECRET)
     req.user = decoded

     return req.user
}

export const getUserProfile = async (req, res) => {
    try {
        const requestUser = requestUserToken(req, res)

        // get user with same token id as in user database
        const user = await User.findOne({ where: { id: requestUser.userid }})
        if (!user){
            return res.status(404).json({error: "User not found"})
        }

        const { password, ...userData } = user.dataValues   // exclude password
        res.status(200).json({ message: "Profile fetched", user: userData });

    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ error: "Something went wrong" });   
    }
    
}


export const updateUserProfile = async (req, res) => {
    try{
        // get request user
        const requestUser = requestUserToken(req, res)

        //    // Only allow access to their own profile
        //    if (parseInt(req.params.id) !== requestUser.userid) {
        //     return res.status(403).json({ error: "Access denied. Invalid user" });
        // }

        const user = await User.findOne({where: {id: requestUser.userid}})
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        const { password, ...userData } = user.dataValues

        // get field values
        let { firstName, lastName, email, telephone, isAdmin } = req.body
        let errors = [];

        // fallback to db values if not values are passed
        firstName = firstName ?? userData.firstName;
        lastName = lastName ?? userData.lastName;
        email = email ?? userData.email;
        telephone = telephone ?? userData.telephone;
        isAdmin = isAdmin ?? userData.isAdmin


        if (firstName.length < 3) {
            errors.push("First name must be at least 3 characters");
        }
        if (lastName.length < 3) {
            errors.push("Last name must be at least 3 characters");
        }
        if (telephone.length !== 10) {
            errors.push("Telephone number must be 10 digits");
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

       const [updated] = await User.update({
        firstName,
        lastName,
        email,
        telephone,
        isAdmin
       }, {
        where: {
            id: userData.id
        }
       })

       if (!updated) {
        return res.status(400).json({ error: "User update failed" });
       }
      
        return res.status(200).json({message: "User profile updated! ", updatedFields: updated })
    } catch(err) {
        console.error("An error occured: User profile cannot be updated")
        return res.status(501).json({error: "Something went wrong. User profile cannot be updated"})
    }
}

export const changeUserPassword = async (req, res) => {
    try {
        const requestUser = requestUserToken(req, res);
        const user = await User.findOne({ where: { id: requestUser.userid } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const currentPassword = user.password;
        const newPassword = req.body.password;

        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        const isSame = await bcrypt.compare(newPassword, currentPassword);
        if (isSame) {
            return res.status(400).json({ warning: "New password must be different from the current password" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.update({ password: hashedPassword }, {
            where: { id: requestUser.userid }
        });

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        console.error("Password update error: ", err);
        return res.status(500).json({ error: "Something went wrong. Password not updated." });
    }
};













/******* GET USER PROFILE WITH USERID PARAM */
// export const getUserProfile = async (req, res) => {
//     try {
//         const requestUser = requestUserToken(req, res)

//            // Only allow access to their own profile
//            if (parseInt(req.params.id) !== requestUser.userid) {
//             return res.status(403).json({ error: "Access denied. Invalid user" });
//         }

//         // get user with same token id as in user database
//         const user = await User.findOne({ where: { id: requestUser.userid }})
//         if (!user){
//             return res.status(404).json({error: "User not found"})
//         }

//         const { password, ...userData } = user.dataValues   // exclude password
//         res.status(200).json({ message: "Profile fetched", user: userData });

//     } catch (error) {
//         console.error("Profile fetch error:", error);
//         res.status(500).json({ error: "Something went wrong" });   
//     }
    
// }
