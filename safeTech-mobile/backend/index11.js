const express = require('express')
const app = express()
const mongoose =require("mongoose")
const User = require('./UserDetails')


const mongoUrl ="mongodb+srv://kelvinafutu8as:kev123melvyn@cluster0.gevmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)
.then(()=>{
    console.log('Database connected')
})
.catch((e)=>{
    console.log("Database error")
})



app.post('/register', async(req, res)=>{
    const { name, email, password} = req.body
    console.log(req.body)
    
    const oldUser = await User.findOne({email:email})
    if(oldUser){
        console.log('user already exists')
    }
    try {
        await User.create({
            name:name,
            email:email,
            password:password
        })
        res.send({
            status:"ok", data:"user Created"
        })
        
    } catch (error) {
        res.send({
            status:"error" , data:error
        })
    }

})



app.use(express.json())

app.listen(5001,()=>{
    console.log("server is running")
})