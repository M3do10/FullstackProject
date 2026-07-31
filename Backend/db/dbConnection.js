import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/EcommerceWEB")

dbConnection.then(()=> console.log("db Connected ")
).catch((err)=> console.log(err,"db error connection")
)