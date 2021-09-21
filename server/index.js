"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//
//Importing all handlers
//
const { getAllProducts, getProductById, getCompanyById, updateInventory } = require("./handlers");

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
<<<<<<< Updated upstream
  .get('/products/:_id', getProductById)
  .get('/companies/:_id', getCompanyById)
  .put('/products/:_id', updateInventory)
=======
  // .get('/companies/:_id', getCompanyById)
  // .put('/items/:_id', updateInventory)
>>>>>>> Stashed changes

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
