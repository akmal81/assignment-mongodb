import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";
import { z } from "zod";

export const borrowRouters = express.Router()



borrowRouters.post('/', async (req: Request, res: Response) => {

    try {
        const body = req.body;
        const borrow = await Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message:(error as Error).message
        })

    }
})

borrowRouters.get('/', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $unwind: "$bookInfo"
            },
            {
                $project: {
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error
        });
    }
});
