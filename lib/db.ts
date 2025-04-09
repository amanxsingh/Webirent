import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Aryan:Aryan123@cluster0.oen15.mongodb.net/webirent';

declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

// Explicitly define the type of 'cached' and ensure it is always initialized
let cached: { conn: any; promise: any } = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;