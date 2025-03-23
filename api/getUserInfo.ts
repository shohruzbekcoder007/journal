import jwt  from "jsonwebtoken";
// require('dotenv').config()

const secretKey = process.env.SECRET_KEY as string;

const  getUserInfo = (authCookie: string) => {
    const decoded = jwt.verify(authCookie, secretKey);
    return decoded;
}

export default getUserInfo