const fs = require("file-system");

const companies = JSON.parse(fs.readFileSync("data/companies.json"));
const items = JSON.parse(fs.readFileSync("data/items.json"));

const updatedArr = [];

companies.forEach((item) => {
  updatedArr.push({
    name: item.name,
    url: item.url,
    country: item.country,
    _id: item.id,
  });
});

const updatedItems = [];
items.forEach((item) => {
  updatedItems.push({
    name: item.name,
    price: item.price,
    body_location: item.body_location,
    category: item.category,
    _id: item._id,
    imageSrc: item.imageSrc,
  });
});

// fs.writeFileSync("data/fixedCompanies.json", JSON.stringify(updatedArr));
fs.writeFileSync("data/fixedItems.json", JSON.stringify(updatedItems));

// module.exports = { updatedArr };
