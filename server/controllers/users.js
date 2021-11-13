import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/usersModel.js'


export const signin =async(req,res)=>{
    const{email,password}=req.body;

    try {
        const existingUser=await User.findOne({email});

        if(!existingUser) return res.status(404).json({message:"user doesn't exist ."});

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(404).json({message:"Invalid password"});

        const token=jwt.sign({email:existingUser.email,id:existingUser._id}, "test",{expiresIn: "1h"})

        res.status(200).json({result:existingUser,token})
    } catch (error) {
        res.status(500).json({message:"something error"})
    }

}

export const signup =async(req,res)=>{

    const {email,password,confirmPassword,firstName,lastName}=req.body;

    try {
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"The Email Is Already used try another one"});

        if(password!=confirmPassword) return res.status(400).json({message:"password doesn't matched"});

        const hashePassword=await bcrypt.hash(password,12)

        const result =await User.create({email,password:hashePassword,name:`${firstName} ${lastName}`});

        const token=jwt.sign({email:result.email,id:result._id}, "test",{expiresIn: "1h"})

        res.status(200).json({result,token});

    } catch (error) {
        res.status(500).json({message:"something error"})
    }
}