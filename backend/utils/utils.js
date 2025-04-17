import jwt from 'jsonwebtoken';


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

export { requestUserToken }