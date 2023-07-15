import app from "../app-config.mjs";
import postUnitTests from "./post-test.mjs";
import getAllUnitTests from "./get-all-test.mjs";
import {dbConnect, dbClose} from '../mongoose-con.mjs';
import {config} from 'dotenv';
config();

let server;
beforeAll(async () => {
    await dbConnect();
    server = app.listen(4000);
})
afterAll(async () => {
    await dbClose();
    server.close();
})

postUnitTests;
getAllUnitTests;