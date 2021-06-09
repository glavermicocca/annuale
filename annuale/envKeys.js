// keys.js ==========
const devKeys = require("./serviceAccountKeyDev.json");
const prodKeys = require("./serviceAccountKeyProd.json");

//this says hey computer look in my current directory for this file. 
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

//I reccomend doing a console.log as well to make sure the names match*
console.log(`./.env.${process.env.NODE_ENV}`)

if (process.env.NODE_ENV === "production") {
    module.exports = prodKeys;
} else {
    module.exports = devKeys;
}