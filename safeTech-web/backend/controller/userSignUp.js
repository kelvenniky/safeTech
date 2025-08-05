import bcrpyt from 'bcryptjs'
import adminModel from '../models/adminModel.js'


async function userSignUpController(req, res) {
    try {
        const {email, password, name} = req.body
        const user = await adminModel.findOne({email})
        if(user){
            throw new Error("user exists already")
        }
        if(!email){
            throw new Error('Please provide email')
        }
        if(!password){
            throw new Error('Please provide password')
        }
        if(!name){
            throw new Error('Please provide name')
        }


        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("something is wrong")
        }
        const payload ={
            ...req.body,
            password: hashPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data:saveUser,
            success:true,
            error: false,
            message:"user created successfully"

        })
      
      

    } catch (err) {
       
        res.json({
            message :err.message || err,
            error:true,
            success:false,
        })
    }
}
export default userSignUpController