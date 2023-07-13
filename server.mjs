import express from 'express';
import config from './configs/app-default.mjs'
import dbConnect from './mongoose-con.mjs';
import booksRouter from './routes/books.mjs'
const app = express();
app.use(express.json());
app.use('/book', booksRouter);


const startServer = async () => {
    try {
        await dbConnect();
        app.listen(config.port, () => console.log(`Listening to port ${config.port}`)); 
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}
startServer();