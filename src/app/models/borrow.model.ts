import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interface/borrow.interface";

const borrowSchema = new Schema<IBorrowBook>({
    book:{
        type: Schema.Types.ObjectId,
        ref:"Book",
        required: true
    },
    quantity:{
        type:Number,
        required: [true, "Must fill the quantity field"]
    },
    dueDate:{
        type: Date,
        required: true
    }
},
{
    versionKey:false,
    timestamps:true
}
)

export const Borrow = model("Borrow", borrowSchema)