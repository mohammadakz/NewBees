//UUID generates random uniquq ids
const { v4: uuidv4 } = require("uuid");

//Import data
//const items = require("./data/items.json");
//const companies = require("./data/companies.json");
//Impory helper functions
const { sendResponse } = require("./utills");

// //Mongodb
// //Connect to the DB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");
const e = require("express");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "E-commerce";

const getAllProducts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(dbName);
    const products = await db.collection("Products").find().toArray();
    client.close();
    sendResponse({ res, status: 200, data: products });
    client.close();
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const getProductById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const _id = Number(req.params._id);
    await client.connect();
    const db = client.db(dbName);
    db.collection("Products").findOne({ _id }, (err, result) => {
      result
        ? sendResponse({ res, status: 200, data: result })
        : sendResponse({
            res,
            status: 400,
            message: "Error: cannot find item",
            data: req.params,
          });
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
    sendResponse({ res, status: 500, message: err.message, data: req.params });
    client.close();
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const _id = req.params._id;
    // _id = _id.charAt(0).toUpperCase() + _id.slice(1);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const products = await db
      .collection("Products")
      .find({ $or: [{ category: _id }] })
      .toArray();
    client.close();
    sendResponse({ res, status: 200, data: products });
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const getCompanyById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const _id = Number(req.params._id);
    await client.connect();
    const db = client.db(dbName);
    db.collection("Companies").findOne({ _id }, (err, result) => {
      result
        ? sendResponse({ res, status: 200, data: result })
        : sendResponse({
            res,
            status: 400,
            message: "Error: Company not found",
            data: req.params,
          });
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
    sendResponse({ res, status: 500, message: err.message, data: req.params });
    client.close();
  }
};

const updateInventory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const _id = Number(req.params._id);
    const numPurchased = Number(req.body.numPurchased);
    await client.connect();
    const db = client.db(dbName);
    db.collection("Products").findOne({ _id }, async (err, result) => {
      if (result.numInStock - numPurchased < 0) {
        sendResponse({
          res,
          status: 400,
          message: "Error not enough stock",
          stockLeft: result.numInStock,
          amountRequested: numPurchased,
        });
      } else {
        const query = { _id };
        const newValues = {
          $set: { numInStock: result.numInStock - numPurchased },
        };
        await db.collection("Products").updateOne(query, newValues);
        sendResponse({ res, status: 200, ...newValues.$set, numPurchased });
        client.close();
      }
    });
  } catch (err) {
    console.log(err.stack);
    client.close();
  }
};

const postUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { fullName, email, image } = req.body;
    const _id = uuidv4();
    const userInfo = {
      _id,
      fullName,
      email,
      image,
    };

    await client.connect();
    const db = client.db(dbName);
    const existingUser = await db
      .collection("Usersinfo")
      .findOne({ email: req.body.email });

    if (existingUser === null) {
      await db.collection("Usersinfo").insertOne(userInfo);
      sendResponse({ res, status: 200, message: "user added to db" });
      client.close();
    } else {
      sendResponse({ res, status: 300, message: "user already exists" });
      client.close();
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const getUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = await db.collection("Usersinfo").find().toArray();
    sendResponse({ res, status: 200, data: users });
    client.close();
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const postCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { items, email } = req.body;
    await client.connect();
    const db = client.db(dbName);
    const _id = uuidv4();
    let itemCounter = 0;
    //Counting the same items in the cart

    const usersCart = {
      _id,
      email,
      items,
    };

    const existingCart = await db
      .collection("UsersCart")
      .findOne({ email: req.body.email });

    if (existingCart === null) {
      await db.collection("UsersCart").insertOne(usersCart);
      sendResponse({ res, status: 200, message: "user's cart added" });
      client.close();
    } else {
      const newCartItems = { $set: { items: usersCart.items } };
      await db
        .collection("UsersCart")
        .updateOne({ email: req.body.email }, newCartItems);

      sendResponse({ res, status: 200, message: "cart is updated now" });
      client.close();
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db
      .collection("UsersCart")
      .findOne({ email: req.body.email });

    if (user.email === req.body.email) {
      sendResponse({ res, status: 200, data: user.items });
      client.close();
    } else {
      sendResponse({ res, status: 200, message: "nothing was found in db" });
      client.close();
    }
    client.close();
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const updateCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(dbName);
    const exitingCart = await db
      .collection("UsersCart")
      .findOne({ email: req.body.email });

    const updatedCart = { $set: { items: req.body.items } };
    await db
      .collection("UsersCart")
      .updateOne({ email: req.body.email }, updatedCart);

    sendResponse({
      res,
      status: 200,
      message: "user's cart updated",
    });
    client.close();
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const deleteCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const _id = req.body.email;
    await client.connect();
    const db = client.db(dbName);
    await db.collection("UsersCart").deleteOne({ email: _id });
    sendResponse({
      res,
      status: 200,
      message: "user's cart deleted",
    });
    client.close();
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getCompanyById,
  getProductsByCategory,
  updateInventory,
  postUserInfo,
  getUserInfo,
  postCart,
  getCart,
  updateCart,
  deleteCart,
};
