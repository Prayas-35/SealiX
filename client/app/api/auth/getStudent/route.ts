"use server";

import connectToDatabase from "@/app/_middleware/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/app/_models/schema";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Find the student
        const student = await User.findOne({ email });

        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Student found successfully",
            student: {
                name: student.name,
                email: student.email,
                walletAddress: student.walletAddress
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error finding student"
        }, { status: 500 });
    }
}