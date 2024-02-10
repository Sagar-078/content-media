const bcrypt = require("bcrypt");

const User = require("../modules/userModel");

const jwt = require("jsonwebtoken");

require("dotenv").config();


// for signUp control handler
exports.signUp = async(req, res) => {
    try{
        // destructure from req body
        const {name, email, password} = req.body;

        // chacking user alrady exist basis of email
        const exsitingUser = await User.findOne({email});

        if(exsitingUser){
            return res.status(400).json({
                success: false,
                message: "user alrady exist"
            });
        }

        let hashPassword;
        // if user not exist in db then hash password by bcrypt hash method
        try{

            hashPassword = await bcrypt.hash(password, 10);

        }catch(err){
            return res.status(500).json({
                success: false,
                message: "err while hashing password"
            });
        }

        // then create a entry in db
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            profile: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        })

        return res.status(200).json({
            success: true,
            message: "user signup successfully"
        });

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "err while user signup"
        })
    }
}



// for login controll handler
exports.logIn = async(req, res) => {
    try{
        const {email, password} = req.body;

        // check is email and pass is prasent or empty
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "fill all ditels"
            });
        }

        // if then check is user prasent in db 
        let user = await User.findOne({email});

        // if user not prasent in db
        if(!user){
            return res.status(401).json({
                success: false,
                message: "user not exist"
            });
        }

        
        const payload = {
            email: user.email,
            id: user._id 
        }

        // then compre pass and bcrypted pass 
        if(await bcrypt.compare(password, user.password)){

            // if pass metch then creata token and send to user res without pass
            let token = jwt.sign(payload, process.env.JWT_SECRET, 
                                                            {
                                                                expiresIn: "30d"
                                                            });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;

        }else{
            return res.status(400).json({
                success: false,
                message:"password doesn't metch"
            });
        }
       
        res.status(200).json({
            success: true,
            message: "user loggedin successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            profile: user.profile,
            token: user.token,
            password: user.password
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "failed to login",
        })
    }
}

// for get all users 
exports.getAllUsers=async(req,res)=>{
    try{
        // destructure user id from req user from middle ware
        const {_id}=req.user;

        // find all users except this id of user who loggedin
        const otherUsers=await User.find({ _id: { $ne: _id } });
        //console.log(otherUsers);
        return res.status(200).json({
            Success:true,
            Message:"okay",
            otherUsers:otherUsers
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "err while fetch all user",
            err
        })
    }
}