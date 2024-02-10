const jwt = require("jsonwebtoken");
const User = require("../modules/userModel");

require("dotenv").config();

exports.auth = async(req, res, next) => {

    let token;
        // if req headers authrization starts with Bearer then 
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            
            // then split the token and verify token 
            token = req.headers.authorization.split(" ")[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");

            next();

        }catch(err){
            res.status(401).json({
                success: false,
                message: "token is invalid"
            });
        }
    }
    // if token is not avelable
    if(!token){
        res.status(401).json({
            success: false,
            message: "token is missing"
        });
    }
};


