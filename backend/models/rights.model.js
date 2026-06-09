import mongoose from "mongoose";

const RightSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    title_hindi: { type: String, required: true }, // New field for Hindi title
    description_hindi: { type: String, required: true } // New field for Hindi description
});

const Right = mongoose.model("Right", RightSchema);
export default Right;
