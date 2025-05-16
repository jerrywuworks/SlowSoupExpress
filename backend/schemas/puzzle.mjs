import mongoose from "mongoose";
const puzzleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true},
    mystery: { type: String, required: true, trim: true},
    truth: { type: String, required: true, trim: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true} );

const Puzzle = mongoose.model("Puzzle", puzzleSchema);
export {Puzzle};
