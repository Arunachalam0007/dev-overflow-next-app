import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// Get all users
export async function GET() {
  try {
    // 1. Connect DB
    await dbConnect();

    // 2. Get all users from the database using the Account model
    // using Mongoose Find Function User.find() returns all the users
    const accounts = await Account.find();

    // 3. Return the users as a success response
    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
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

    // 3. Validate the Request
    const validatedData = AccountSchema.safeParse(body);

    // 4. Throw an ValidationError if Validation fails
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    // 5. Check if the ProviderAccountId and provider already exists in the database
    // Mongoose findOne function is used to find a single document in the database
    const existingAccount = await Account.findOne({
      ProviderAccountId: validatedData.data.providerAccountId,
      provider: validatedData.data.provider,
    });

    // 6. If the provider and ProviderAccountId already exists, return an error
    if (existingAccount) {
      throw new ForbiddenError(
        "An Account with this provider and ProviderAccountId already exists."
      );
    }

    // 7. Create a new user using the User model
    const newAccount = await Account.create(validatedData.data);

    // 8. Return the new user as a success response
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
