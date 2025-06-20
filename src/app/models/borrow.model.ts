import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interface/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrowBook>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: [true, "Must fill the quantity field"]
    },
    dueDate: {
        type: Date,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

borrowSchema.pre("save", async function (next) {

    const findBook = await Book.findById(this.book);

    if (!findBook) {
        throw new Error("Book not found");
    }

    if (findBook.copies < this.quantity) {
        throw new Error("Not enough copies available");
    }

    await findBook.adjustCopies(this.quantity);
    next()
})

export const Borrow = model("Borrow", borrowSchema)