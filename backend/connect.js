const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({path:"./config.env"});
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


let database

module.exports={
connectToServer:() =>{
   database = client.db("GraminDB");
 },
getDb: () => {
    return database;
 },
}


