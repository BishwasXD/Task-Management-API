const { MongoClient } = require('mongodb');
require('dotenv').config({ path: require('path').resolve('EBPearls-Task-Management', '../../../.env') });


const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER
const DATABASE =  process.env.DATABASE;
const TABLE = process.env.TABLE;


const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.xkdkdq3.mongodb.net/`


async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("database connected successfully");

    const db = client.db(DATABASE);
    const collection = db.collection(TABLE);

    const document = await collection.findOne();
    console.log("data found:", document);

  } catch (err) {
    console.error("connection failed:", err);
  }
  finally {
    client.close()
  }
}

testConnection();
