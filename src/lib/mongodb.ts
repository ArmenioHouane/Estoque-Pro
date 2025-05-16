import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://estoquepro:oznOLmMmOq8m7z9G@cluster1.yqomuu3.mongodb.net/?retryWrites=true&w=majority&appName=cluster1";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// @ts-expect-error: Espera-se que global.mongoose não esteja tipado corretamente
let cached = global.mongoose;

if (!cached) {
  // @ts-expect-error: Espera-se que a atribuição de tipo seja inválida
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
