import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requestUserToken } from '../utils/utils.js';

export const verifyAdmin = async (req, res, next) => {
    try {
      const requestUser = requestUserToken(req, res); // this decodes the token and gives you user ID
      const user = await User.findByPk(requestUser.userid);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (!user.isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
      }

      req.user = user;
      next(); // user is admin, continue to route
    } catch (err) {
      console.error('Admin check error:', err);
      return res.status(500).json({ error: 'Server error while checking admin privileges' });
    }
  };
