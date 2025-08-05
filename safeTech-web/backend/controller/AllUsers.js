import userModel from '../models/userModel.js'


async function AllUsers (req, res) {
    try {
        const allUsers = await userModel.find()

        res.json({
            message:'All Users',
            data:allUsers,
            error:false,
            success:true
            
        })
    } catch (err) {
        res.json({
            message :err.message || err,
            error:true,
            success:false,
        })
    }
}
export default AllUsers