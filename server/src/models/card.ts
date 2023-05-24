import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const CardSchema = new Schema({
    front: String,
    back: String
})

const CardModel = mongoose.model("Card", CardSchema);

export default CardModel;