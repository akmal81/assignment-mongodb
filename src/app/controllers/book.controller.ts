import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRouters = express.Router()

//1
bookRouters.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error

        })
    }
})

//2 incomplelet
bookRouters.get('/', async (req: Request, res: Response) => {
    const body = req.body;
    const books = await Book.find(body);

    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books

    })
})

//3
bookRouters.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book

    })
})

//4
bookRouters.put('/:bookId', async (req: Request, res: Response) => {
    
    const bookId = req.params.bookId;
    const updateBookData = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updateBookData, {new:true});
    
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    })
})

//5
bookRouters.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    await Book.findByIdAndDelete(bookId);
    
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})



