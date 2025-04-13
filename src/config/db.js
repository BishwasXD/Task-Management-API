import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.URI

export async function establishDataBaseConnection() {
  try{
    const connection = await mongoose.connect(URI);
    console.log(`DATABASE connected at ${connection.connection.host}`);

  } catch (err) {
    console.error("Database connection error: ", err);
    process.exit(1);
  }
}

