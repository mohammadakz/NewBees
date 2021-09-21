//UUID generates random uniquq ids
const { v4: uuidv4 } = require("uuid");

//Import data
const items = require("./data/items.json");
const companies = require("./data/companies.json");
//Impory helper functions
const { sendResponse } = require("./utills");

// //Mongodb
// //Connect to the DB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 };


const getAllProducts = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client
        sendResponse({ res, status: 200, data: items });
    } catch (err) {
        sendResponse({ res, status: 400, message: err.message });
    };
};

const getProductById = (req, res) => {
    try {
        const id = Number(req.params._id);
        const foundItem = items.find((item) => item._id === id);
        if (foundItem) {
            sendResponse({ res, status: 200, data: foundItem })
        } else {
            sendResponse({ res, status: 400, message: 'Error: cannot find item', data: req.params });
        };
    } catch (err) {
        console.log(err.stack);
        sendResponse({ res, status: 500, message: err.message, data: req.params });
    };
};

const getCompanyById = (req, res) => {
    try {
        const id = Number(req.params._id);
        const foundCompany = companies.find((company) => company._id === id);
        if (foundCompany) {
            sendResponse({ res, status: 200, data: foundCompany });
        } else {
            sendResponse({ res, status: 400, data: req.params, message: 'Error: Company not found' });
        };
    } catch (err) {
        console.log(err.stack);
        sendResponse({ res, status: 500, message: err.message, data: req.params })
    };
};

const updateInventory = (req, res) => {
   /*  try {
        const itemId = Number(req.params_id);
        const numPurchased = Number(req.body.numPurchased);
        for (let item of items) {
            if (item._id === itemId) {
                item.numInStock -= numPurchased;
                console.log(item.numInStock, 'hit');
        }
        res.status(200).json({
            status: 200,
            message: "Item updated!",
            data: 'ok'
        })
    }
    } catch (err) {
        console.log(err.stack)
    } */
};

module.exports = { getAllProducts, getProductById, getCompanyById, updateInventory };
