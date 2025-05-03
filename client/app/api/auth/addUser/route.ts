"use server";

import connectToDatabase from "@/app/_middleware/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/app/_models/schema";

// Function to add new user
const postHandler = async (req: Request) => {
    try {
        const { name, email, walletAddress } = await req.json();

        // Connect to the database
        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Create new user
        const newUser = await User.create({
            name,
            email,
            walletAddress
        });

        return NextResponse.json({
            message: "User created successfully",
            user: newUser,
            email: newUser.email
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: "Error creating user"
        }, { status: 500 });
    }
}

export {
    postHandler as POST,
}