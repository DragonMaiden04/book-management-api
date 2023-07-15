import app from "../app-config.mjs";
import request from "supertest";
import bookModel from '../models/books/details.mjs';
import {mockGetAllData} from './mock-data.mjs';
import {jest} from "@jest/globals";

let getAllUnitTests = describe("Get All Books", () => {
    test("it should successfully fetch all book details with default limit 10", async() => {
        jest.spyOn(bookModel, 'find')
        .mockImplementationOnce(() => ({
            limit: () => mockGetAllData
        }));
        const res = await request(app).get("/books").expect(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.enum).toEqual("SUCCESS");
        expect(res.body.data.length).not.toEqual(0);
        expect(res.body.data.length).toEqual(10);
    })
    test("it should successfully fetch all book details with specified limit", async() => {
        jest.spyOn(bookModel, 'find')
        .mockImplementationOnce(() => ({
            limit: (limit) => mockGetAllData.slice(0, limit)
        }));
        const res = await request(app).get("/books").query({limit: 5}).expect(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.enum).toEqual("SUCCESS");
        expect(res.body.data.length).not.toEqual(0);
        expect(res.body.data.length).toEqual(5);
    })
    test("it should handle error when model function fails", async() => {
        jest.spyOn(bookModel, 'find')
        .mockImplementationOnce(() => ({
            limit: jest.fn().mockRejectedValueOnce(new Error('Model Error Message'))
        }));
        const res = await request(app).get("/books").expect(400);
        expect(res.body.code).toEqual(400);
        expect(res.body.enum).toEqual("FAILED");
        expect(res.body.message).toEqual("Model Error Message");
    })
    test("it should respond with generic error message when error message is undefined or empty", async() => {
        jest.spyOn(bookModel, 'find')
        .mockImplementationOnce(() => ({
            limit: jest.fn().mockRejectedValueOnce(new Error(''))
        }));
        const res = await request(app).get("/books").expect(400);
        expect(res.body.code).toEqual(400);
        expect(res.body.enum).toEqual("FAILED");
        expect(res.body.message).toEqual("An error has occured");
    })
});

export default getAllUnitTests