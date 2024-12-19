import jwt from 'jsonwebtoken';
export const retrieveUserCredentialsFromToken= (token,)=>{
    const decoded = jwt.verify(req.headers.authorization as string, config.jwt_secret as string) as JwtPayload
        const email:string = decoded.email;
        const role:string = decoded.role;
}