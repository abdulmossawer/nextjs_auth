import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        console.log(token);
        
        //Find user via token
        const user =  await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        //check if user does't exists
        if (!user) {
           return NextResponse.json({message: 'Invalid Token'}, {status: 400})
        }

        user.isVerified = true,
        user.verifyToken = undefined,
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    }  catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
    
}