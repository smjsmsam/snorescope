require('dotenv').config();

// code given by mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    db = client.db('SnoreScope') // connect to specific database
    return db;
  }
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit();
  }
  catch (error) {
    console.error('Error client.close()', error);
  }
});

module.exports = { run };