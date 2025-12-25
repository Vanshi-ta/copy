import { clerkClient, clerkMiddleware, getAuth, requireAuth } from '@clerk/express'
import express from 'express'
import {prisma} from '../lib/prisma'
// const app = express()


// @ts-nocheck

const Signin = async (req, res) => {
    const { userId } = req.body;

    if(!userId){
        return res.status(400).json({error: "Missing userId"});
    }

    try {
        const user = await clerkClient.users.getUser(userId);
        const email = user?.emailAddresses?.[0]?.emailAddress;

        if(!user || !email){
            return res.status(401).json({error:"Unauthorized or email missing"});
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        
        if(!existingUser){
            const result = await prisma.user.create({
                data:{
                    id:user.id,
                    email:email,
                    name:user.firstName,
                }
            })
            return res.status(201).json(result);
        }

        return res.status(200).json(existingUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

export {Signin}