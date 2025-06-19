import { Types } from "mongoose";

export interface IBook {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}