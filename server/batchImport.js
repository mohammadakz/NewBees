const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Import data
const items = require("./data/items.json");
const companies = require("./data/companies.json");

//Import info to the databse (mongodb)
const batchImport = async () => {
  // creates a new client
  console.log(MONGO_URI);
  const client = await new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("E-commerce");
    console.log("connected!");

    await db.collection("Products").insertMany(items);
    await db.collection("Companies").insertMany(companies);
  } catch (err) {
    console.log(err);
  }
  client.close();
  console.log("disconnected!");
};

batchImport();
