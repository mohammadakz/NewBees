//UUID generates random uniquq ids
const { v4: uuidv4 } = require("uuid");

//Import data
const items = require("./data/fixedItems.json");
const companies = require("./data/fixedCompanies.json");
//Impory helper functions
const { sendResponse } = require("./utills");

// //Mongodb
// //Connect to the DB
// const { MongoClient } = require("mongodb");
// require("dotenv").config();
// const { MONGO_URI } = process.env;
// const assert = require("assert");

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const getAllProducts = async (req, res) => {
  try {
    sendResponse({ res, status: 200, data: items });
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

module.exports = { getAllProducts };
