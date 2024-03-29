const jwt = require('jsonwebtoken');
const isAuth = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(400).send({message: "User not Login"})
    }else{
        const userAuth = jwt.verify(token, process.env.SECRET_KEY)
        console.log("userAuth:",userAuth,"-------");
        if(!userAuth){
            return res.status(400).send({message: "User not authorized"})
        }else{
            req.user = userAuth;
            next();
        }
    }
}

module.exports = isAuth;