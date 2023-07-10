import mongoose from "mongoose";

let dbConnect = async () => {
    await mongoose.connect(process.env.LOCAL_DB, {useNewUrlParser: true});
    console.log('Connected to Mongo DB');
}
export default dbConnect