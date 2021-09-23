"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//
//Importing all handlers
//
const {
  getAllProducts,
  getProductById,
  getCompanyById,
  updateInventory,
  getUserInfo,
  postUserInfo,
  getCart,
  postCart,
  updateCart,
  deleteCart,
  getProductsByCategory,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/products", getAllProducts)
  .get("/products/:_id", getProductById)
  .get("/companies/:_id", getCompanyById)
  .put("/products/:_id", updateInventory)
  //users endpoints
  .get("/users", getUserInfo)
  .post("/users", postUserInfo)
  //users cart endpoint
  .post("/getcart", getCart)
  .post("/cart", postCart)
  //delete and update the cart
  .put("/cartupdate", updateCart)
  .delete("/checkout", deleteCart)

  .get("/products/catogories/:_id", getProductsByCategory)
  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
