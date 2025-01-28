import { NextResponse } from "next/server";

interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

type ActionResponse<T = null> = {
  success: boolean;
  status?: number;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>; // Validation errors
  };
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APISuccessResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse
>;
type APIErrorResponse = NextResponse<ErrorResponse>;
