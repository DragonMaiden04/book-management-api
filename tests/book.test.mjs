import app from "../app-config.mjs";
import request from "supertest";
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

describe("Save book details", () => {
    test("it should save the book details succesfully", async () => {
        const res = await request(app).post("/book").send({
            title: "Hello",
            author: "Anonymous",
            genre: "Slice of Life"
        })
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
    })
})