import {jest} from "@jest/globals";
import app from "../app-config.mjs";
import request from "supertest";
import bookModel from '../models/books/details.mjs'
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
        jest.spyOn(bookModel, 'create').mockImplementationOnce(() => Promise.resolve({}));
        const res = await request(app).post("/book").send({
            title: "Hello",
            author: "Anonymous",
            genre: "Slice of Life"
        })
        let expectedResponse = {
            code: 200,
            enum: "SUCCESS",
            message: "book detail has been saved"
        }
        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual(expectedResponse);
    })
    test("it should respond with 400 error if create model fails", async () => {
        jest.spyOn(bookModel, 'create').mockImplementationOnce(() => Promise.reject({}));
        const res = await request(app).post("/book").send({
            title: "Hello",
            author: "Anonymous",
            genre: "Slice of Life"
        })
        let expectedResponse = {
            code: 400,
            enum: "FAILED",
            message: "An error has occured"
        }
        expect(res.statusCode).toEqual(400);
        expect(res.body).toStrictEqual(expectedResponse);
    })
    test("it should respond with 422 error if title is missing in req body", async () => {
        const res = await request(app).post("/book").send({
            author: "Anonymous",
            genre: "Slice of Life"
        })
        console.log(res.body);
        let expectedResponse = {
            code: 422,
            enum: "FAILED",
            message: "\"title\" is required"
        }
        expect(res.statusCode).toEqual(422);
        expect(res.body).toStrictEqual(expectedResponse);
    })
    test("it should respond with 422 error if author is missing in req body", async () => {
        const res = await request(app).post("/book").send({
            title: "Test",
            genre: "Slice of Life"
        })
        console.log(res.body);
        let expectedResponse = {
            code: 422,
            enum: "FAILED",
            message: "\"author\" is required"
        }
        expect(res.statusCode).toEqual(422);
        expect(res.body).toStrictEqual(expectedResponse);
    })
    test("it should respond with 422 error if genre is missing in req body", async () => {
        const res = await request(app).post("/book").send({
            title: "Test",
            author: "Test"
        })
        console.log(res.body);
        let expectedResponse = {
            code: 422,
            enum: "FAILED",
            message: "\"genre\" is required"
        }
        expect(res.statusCode).toEqual(422);
        expect(res.body).toStrictEqual(expectedResponse);
    })
})