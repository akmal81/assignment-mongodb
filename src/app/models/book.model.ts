import { Model, model, Schema } from "mongoose";

import { BookInstanceMethods, IBook } from "../interface/book.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook, Model<IBook>, BookInstanceMethods>({
    title: {
        type: String,
        required: [true, 'Title must be provided'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author must be be provided'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.'],
        uppercase: true,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: "Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY."
        }
    },
    isbn: {
        type: String,
        unique: [true, 'isbn-no must be unique'], //
        required: [true, 'isbn must be provided'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
        default: '',
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"]
    },
    available: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }

)

bookSchema.method("adjustCopies", async function (quantity: number) {

    this.copies -= quantity;
    if (this.copies <= 0) {
        this.available = false;
        this.copies = 0
    }
    return await this.save()

})

bookSchema.post("findOneAndDelete", async function (doc, next) {
    if(doc){
        await Borrow.deleteMany({book:doc.id})
    }
    next()
})

export const Book = model("Book", bookSchema)