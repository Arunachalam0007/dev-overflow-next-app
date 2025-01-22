import mongoose, { Mongoose } from "mongoose";
import { decl } from "postcss";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("No MONGODB_URI provided");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

// This Sigleton pattern Declear the connection once
//  and maintain the single instance of the connection improves the performance and reliablity
//  of the application

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// for mongoose connecting to the MongoDB

const dbConnect: () => Promise<Mongoose> = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "devflow",
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((result) => {
      console.log("Connected to MongoDB");
      return result;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
