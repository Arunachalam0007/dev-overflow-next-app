import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema, UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// GET /api/users/[id] - Get a single Account by ID
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Get the ID from the params
  const { id } = await params;

  // 2. Throw a NotFoundError if the ID is not provided
  if (!id) throw new NotFoundError("Account");
  try {
    // 3. Connect to the database
    await dbConnect();

    // 4. Find the Account by ID
    // or Account.findOne({ _id: id });
    const account = await Account.findById(id);

    // 5. Throw a NotFoundError if the account is not found
    if (!account) throw new NotFoundError("Account");

    //6. Return the user as a success response
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    // 7. Handle the error using the custom error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

// DELETE /api/users/[id] - Delete a Account by ID
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Get the ID from the params
  const { id } = await params;

  // 2. Throw a NotFoundError if the ID is not provided
  if (!id) throw new NotFoundError("Account");

  try {
    // 3. Connect to the database
    await dbConnect();

    // 4. Find the Account by ID and delete it
    // or User.findOneAndDelete({ _id: id });
    const account = await Account.findByIdAndDelete(id);

    // 5. Throw a NotFoundError if the Account is not found
    if (!account) throw new NotFoundError("Account");

    // 6. Return a success response
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    // 7. Handle the error using the custom error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT /api/users/[id] - Update a Account by ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Get the ID from the params
  const { id } = await params;

  // 2. Throw a NotFoundError if the ID is not provided
  if (!id) throw new NotFoundError("Account");
  try {
    // 3. Connect to the database
    await dbConnect();
    const body = await request.json();

    // 4. Validate the request body
    // Partial is used to allow partial updates
    const validatedData = AccountSchema.partial().safeParse(body);

    // 5. Throw a ValidationError if Validation fails
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    // 5. Find the Account by ID and update it
    // or User.findOneAndUpdate({ _id: id }, { $set: request.body }, { new: true });
    const updatedAccount = await Account.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    // 6. Throw a NotFoundError if the user is not found
    if (!updatedAccount) throw new NotFoundError("Account");

    // 7. Return the updated user as a success response
    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    // 8. Handle the error using the custom error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}
