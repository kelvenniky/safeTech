import User from '../models/userModel.js'

async function userDetailsController(req,res) {
    try {
        console.log("user.id", req.userId)
        const user = await User.findById(req.userId)

        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"User Details"
        })
        console.log("user", user)
    } catch (err) {
        res.status(400).json({
            message:err.message ||err,
            error:true,
            success:false
        })
    }
}
export default  userDetailsController