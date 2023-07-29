import  jwt  from "jsonwebtoken";

export function createAccessJwt(payload){
    const accessToken=jwt.sign({playload},process.env.JWT_SECRET,{expiresIn:"15m"})
    return accessToken
}

export function createRefreshJwt(payload){
    const accessToken=jwt.sign({playload},process.env.JWT_SECRET,{expiresIn:"30d"})
    return accessToken
}