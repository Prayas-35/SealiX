"use server";

import connectToDatabase from "@/app/_middleware/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/app/_models/schema";

const getHandler = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const walletAddress = url.searchParams.get('walletAddress');
        
        if (!walletAddress) {
            return NextResponse.json({
                message: "Wallet address is required"
            }, { status: 400 });
        }

        await connectToDatabase();
        const user = await User.findOne({ walletAddress });
        
        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 401 });
        }

        return NextResponse.json({
            name: user.name,
            email: user.email,
            walletAddress: user.walletAddress
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching user data"
        }, { status: 500 });
    }
}

export {
    getHandler as GET,
}