/******** USER ROUTES */
/////////   user profile [view] ( GET | POST )
import { changeUserPassword, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import express from 'express'
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router()

// GET routes
router.get('/profile', verifyUser, getUserProfile)


// PUT routes
router.put('/profile/update', verifyUser, updateUserProfile)
router.put('/profile/update/password', verifyUser, changeUserPassword)

//POST routes
export { router }


//
