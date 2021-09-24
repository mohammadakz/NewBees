const fs = require("file-system");

const companies = require('./data/companies.json');
const items = require('./data/items.json');

const refItems = items.filter((item) => typeof item.price === 'string');




let categories = new Set();
items.forEach((item) => categories.add(item.category));
console.log(categories);

/* const updatedArr = [];

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
 */
// fs.writeFileSync("data/fixedCompanies.json", JSON.stringify(updatedArr));
//fs.writeFileSync("data/fixedItems.json", JSON.stringify(updatedItems));

// module.exports = { updatedArr };
