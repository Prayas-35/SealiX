"use server";

import connectToDatabase from "@/app/_middleware/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/app/_models/schema";

const getUserHandler = async (req: Request) => {
    try {
        const { walletAddress } = await req.json();
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
            }, { status: 404 });
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