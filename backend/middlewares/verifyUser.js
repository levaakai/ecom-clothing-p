import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const token = req.cookies.ecom_clothing;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};
