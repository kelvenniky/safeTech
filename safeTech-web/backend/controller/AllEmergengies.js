import emergencyModel from '../models/emergencyModel.js'


async function AllEmergencies (req, res) {
    try {
        const AllEmergencies = await emergencyModel.find()

        res.json({
            message:'All Emergencies',
            data:AllEmergencies,
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
export default  AllEmergencies