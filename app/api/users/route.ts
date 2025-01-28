import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import logger from "@/lib/logger";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// Get all users
export async function GET() {
  try {
    // 1. Connect DB
    await dbConnect();

    // 2. Get all users from the database using the User model
    // using Mongoose Find Function User.find() returns all the users
    const users = await User.find();

    // 3. Return the users as a success response
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    // 4. Handle the error is an custom error handler
    return handleError(error, "api") as APIErrorResponse; // APIErrorResponse is a custom type;
  }
}

// Create a new user
export async function POST(request: Request) {
  try {
    // 1. Connect to the db

    await dbConnect();

    // 2. Parse the request body
    const body = await request.json();

    console.log("Request BODY JSON ", body);

    // 3. Validate the Request
    const validatedData = UserSchema.safeParse(body);

    console.log("validatedData", validatedData);

    // 4. Throw an ValidationError if Validation fails
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    // 5. Check if the user and email already exists in the database
    // Mongoose findOne function is used to find a single document in the database
    const existingUser = await User.findOne({
      email: validatedData.data.email,
    });
    const existingUsername = await User.findOne({
      username: validatedData.data.username,
    });

    // 6. If the user or email already exists, return an error
    if (existingUser) {
      throw new Error("User already exists");
    }
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // 7. Create a new user using the User model
    const newUser = await User.create(validatedData.data);

    // 8. Return the new user as a success response
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
