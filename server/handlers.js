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


const getCompanyById = (req, res) => {
    const id = Number(req.params._id);
    const foundCompany = companies.find((company) => company._id === id);
    if (foundCompany) {
        res.status(200).json({
            status: 200,
            message: 'Success: Company Found!',
            data: foundCompany
        });
    } else {
        res.status(400).json({
            status: 400,
            message: 'No company with that ID found',
            dataSent: req.params
        });
    };
};
/* const updateInventory = (req, res) => {
    try {
        let updatedItem = '';
        const itemId = Number(req.params_id);
        const numPurchased = Number(req.body.numPurchased);
        for (let item of items) {
            if (item._id === itemId) {
                item.numInStock =- numPurchased;
                updatedItem = item;
            }
        }
        res.status(200).json({
            status: 200,
            message: "Item updated!",
            data: updatedItem
        })
    } catch (err) {
        console.log(err.stack)
    }

} */

module.exports = { getAllProducts, getCompanyById, updateInventory };
