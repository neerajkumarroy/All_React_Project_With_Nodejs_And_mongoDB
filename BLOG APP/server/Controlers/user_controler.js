import User from '../Schema/user.js'


export const signupUser = async(req,resp) => {
    try {
        const user = req.body;
        const NewUser = new User(user)
        await NewUser.save()
        return resp.status(200).json({msg:"Signup Successfull..."})
    } catch (err) {
return resp.status(500).json({msg:"Error is occer during the Signup..."})
    }
}