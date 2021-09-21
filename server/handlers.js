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

const dbName = 'E-commerce';

const getAllProducts = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db(dbName);
        const products = await db.collection('Products').find().toArray();
        client.close();
        sendResponse({ res, status: 200, data: products });
    } catch (err) {
        sendResponse({ res, status: 400, message: err.message });
    };
};

const getProductById = async (req, res) => {
    try {
        const _id = Number(req.params._id);
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db(dbName);
        db.collection('Products').findOne({ _id }, (err, result) => {
            result
                ? sendResponse({ res, status: 200, data: result })
                : sendResponse({ res, status: 400, message: 'Error: cannot find item', data: req.params });
            client.close();
        })
    } catch (err) {
        console.log(err.stack);
        sendResponse({ res, status: 500, message: err.message, data: req.params });
    };
};

const getCompanyById = async (req, res) => {
    try {
        const _id = Number(req.params._id);
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db(dbName);
        db.collection('Companies').findOne({ _id }, (err, result) => {
            result
                ? sendResponse({ res, status: 200, data: result })
                : sendResponse({ res, status: 400, message: 'Error: Company not found', data: req.params });
            client.close();
        })
    } catch (err) {
        console.log(err.stack);
        sendResponse({ res, status: 500, message: err.message, data: req.params })
    };
};

const updateInventory = async (req, res) => {
    try {
        const _id = Number(req.params._id);
        const numPurchased = Number(req.body.numPurchased);
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db(dbName);
        db.collection('Products').findOne({ _id }, async (err, result) => {
            if (result.numInStock - numPurchased < 0) {
                sendResponse({
                    res,
                    status: 400,
                    message: 'Error not enough stock',
                    stockLeft: result.numInStock,
                    amountRequested: numPurchased
                })
            } else {
                const query = { _id };
                const newValues = { $set: { numInStock: result.numInStock - numPurchased } };
                await db.collection('Products').updateOne(query, newValues);
                client.close();
                sendResponse({ res, status: 200, ...newValues.$set, numPurchased })
            }
        });
    } catch (err) {
        console.log(err.stack)
    }
};

module.exports = { getAllProducts, getProductById, getCompanyById, updateInventory };
