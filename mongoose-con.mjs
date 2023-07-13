import mongoose from "mongoose";

let dbConnect = async () => {
    await mongoose.connect(process.env.LOCAL_DB, {useNewUrlParser: true});
    console.log('Connected to Mongo DB');
}

let dbClose =  async () => {
    await mongoose.connection.close();
    console.log('Connection closed');
}
export {dbConnect, dbClose}