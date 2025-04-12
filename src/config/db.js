import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.URI

export async function establishDataBaseConnection() {
  try{
    const connection = await mongoose.connect(URI);
    console.log(`DATABASE connected :${connection.connection.host}`);
    console.log("database connected successfully");

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

