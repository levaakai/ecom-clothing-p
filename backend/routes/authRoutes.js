import express from 'express'
import { registerUser, loginUser, logoutUser, resetPassword, requestResetPassword } from '../controllers/authContoller.js'
import { verifyUser } from '../middlewares/verifyUser.js'

const router = express.Router()

// POST routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/reset-password-request', verifyUser, requestResetPassword)
router.post('/reset-password', verifyUser, resetPassword)


// GET routes   --> views
router.get('/register', registerUser)
router.get('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/reset-password/:token', (req, res) => {
    res.send("Token received. Now change your password with this token.");
  });
  


export { router }