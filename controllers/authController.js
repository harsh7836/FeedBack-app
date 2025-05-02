import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
    try {
        const {name,email,password} = req.body
        //validations
        if(!name){
            return res.send({error:"Name is Required"})
        }
        if(!email){
            return res.send({error:"email is Required"})
        }
        if(!password){
            return res.send({error:"password is Required"})
        }
        //check user
        const existingUser = await userModels.findOne({email})
        //existing User
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:`Already Register Please login`,
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const users = await new userModels({name,email,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:`User Register Successfully`,
            users
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:`Error in Registration`,
            error
        })
    }
};

//POST LOGIN
export const loginController = async(req, res) => {
    try{
        const {email, password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:`Invalid email or password`
            })
        }
        //check user
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                status:false,
                message:`Email is not registered`
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user: {
                name: user.name,
                email: user.email
            },
            token,
        });
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:`Error in login`,
            error
        })
    }
};

//test controller
export const testController = (req, res) => {
    res.send("Protected Routes");
}