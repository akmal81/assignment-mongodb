import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, 'Title should be provided'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author name should be provided'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre should be provided'],
        uppercase: true,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: "genre is not valid, got {value}"
        }
    },
    isbn: {
        type: String,
        unique: [true, 'isbn-no must be unique'], //
        required: [true, 'isbn should be provided'],
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
        min: [1, "Copies must be a positive number"]
    },
    available: {
        type: Boolean,
        default: true
    }

},
{
    versionKey:false,
    timestamps:true
}

)

export const Book = model("Book", bookSchema)