const express = require("express");
const bodyParser = require("body-parser");
const headers = new express.Router()

headers.use(bodyParser.json());
headers.use(bodyParser.urlencoded({ extended: false }));
console.log("headers-middleware")

headers.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH,PUT, DELETE, OPTIONS"
    );
    next();
});

module.exports = headers
export default headers
