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
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const products = await db.collection("Products").find().toArray();
    client.close();
    sendResponse({ res, status: 200, data: products });
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const _id = Number(req.params._id);
    const client = new MongoClient(MONGO_URI, options);
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
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const _id = req.params._id;
    console.log(_id);
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
  }
};

const getCompanyById = async (req, res) => {
  try {
    const _id = Number(req.params._id);
    const client = new MongoClient(MONGO_URI, options);
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
  }
};

const updateInventory = async (req, res) => {
  try {
    const _id = Number(req.params._id);
    const numPurchased = Number(req.body.numPurchased);
    const client = new MongoClient(MONGO_URI, options);
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
        client.close();
        sendResponse({ res, status: 200, ...newValues.$set, numPurchased });
      }
    });
  } catch (err) {
    console.log(err.stack);
  }
};

const postUserInfo = async (req, res) => {
  try {
    const { fullName, email, image } = req.body;
    const _id = uuidv4();
    const userInfo = {
      _id,
      fullName,
      email,
      image,
    };

    const client = new MongoClient(MONGO_URI, options);
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
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const users = await db.collection("Usersinfo").find().toArray();
    sendResponse({ res, status: 200, data: users });
    client.close();
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
  }
};

const postCart = async (req, res) => {
  try {
    const { items, email } = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const _id = uuidv4();

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
  }
};

const getCart = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const user = await db
      .collection("UsersCart")
      .findOne({ email: req.body.email });

    if (user.email === req.body.email) {
      sendResponse({ res, status: 200, data: user.items });
    } else {
      sendResponse({ res, status: 200, message: "nothing was found in db" });
    }
    client.close();
  } catch (err) {
    // sendResponse({ res, status: 400, message: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
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
  }
};

const deleteCart = async (req, res) => {
  const _id = req.body.email;

  try {
    const client = new MongoClient(MONGO_URI, options);
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
