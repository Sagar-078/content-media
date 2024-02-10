const Content = require("../modules/contentModel");

// for create post
exports.contentPost = async(req, res) => {
    try{

        const { content } = req.body;
        const {_id} = req.user;

        //console.log(_id);
       
        // create content by create method
        const contentData = await Content.create({
            createdBy: _id,
            content,
            createdAt:Date.now()
        });
        contentData.createdBy=req.user;
        res.json({
            success: true,
            messge: "content post successfully",
            contentData
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "content cannot upload"
        });
    }
}


// get all post 
exports.getAllPosts=async (req,res)=>{
  try{
    // find content and shot by time createdAt 
    const posts=await Content.find().populate({
        path:"createdBy",
        select:"_id name profile"
    }).sort({createdAt:-1})

    return res.status(200).json({
        Success:true,
        Message:"Okay bro",
        Posts:posts
    })
  }catch(err){
     return res.status(500).json({
        Success:false,
        Message:"Habani bhai..."
     })
  }
}

// for like post
exports.likePost = async(req,res) =>{
  
    try{
        const {postid}=req.body;
        const {_id}=req.user;
    

        //console.log("postid => ",postid);
        //console.log("id => ",_id);

        // find a post by it's id and push user id into likedusers array
        const updatedpost=await Content.findByIdAndUpdate({_id:postid},{$push:{likedusers:_id}},{new:true}).populate({
            path:"createdBy",
            select:"_id name profile"
        });

        return res.status(200).json({
        success: true,
        message: "post liked successfully",
        updatedpost:updatedpost
    })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "can't like err while like post"
        })
    }

}

/// for dislike post
exports.disLikePost= async (req,res) =>{
    try{
        const {postid}=req.body;
        const {_id}=req.user;
  
        // find a post by it's id and pull user id from likedusers array
        const updatedpost=await Content.findByIdAndUpdate({_id:postid},{$pull:{likedusers:_id}},{new:true}).populate({
        path:"createdBy",
        select:"_id name profile"
        });
        return res.status(200).json({
            success: true,
            message: "post disliked successfully",
            updatedpost:updatedpost
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "err while dislike post"
        });
    }
}