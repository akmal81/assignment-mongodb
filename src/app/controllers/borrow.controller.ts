import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRouters = express.Router()

borrowRouters.post('/', async (req: Request, res: Response) => {

    try {
        const body = req.body;

        const findBook = await Book.findById(body.book);

        if (!findBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found w",
            })
        }

        if (findBook.copies <body.quantity) {
            return res.status(404).json({
                success: false,
                message: "Requested copies are not available",
            })
        }

        await findBook.adjustCopies(body.quantity)

        
        const borrow = await Borrow.create(body);


        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Book not found",
        })

    }

})