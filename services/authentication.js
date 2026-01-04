const JWT=require("jsonwebtoken")

//token generation
function generateToken(email){
    const payload={
        email:email,
        role:"ADMIN"
    }
    return JWT.sign(payload,process.env.SECRET)
}

//token verification
function verifyToken(token){
    try {
        const payload=JWT.verify(token,process.env.SECRET)
        return payload
    } catch (error) {
        return null;
    }
}

module.exports={
    generateToken,verifyToken
}