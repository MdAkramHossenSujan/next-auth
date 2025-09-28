const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//Create a function to catch collection and to connect with mongodb
export async function mongodbConnect(collection) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a console to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db = client.db('nextauthuser');
  return db.collection(collection);
  } catch {
    // Ensures that the client will close when you finish/error
     console.error("❌ MongoDB connection failed:", error);
  }
}
