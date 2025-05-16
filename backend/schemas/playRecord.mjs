import mongoose from "mongoose";
const playRecordSchema = new mongoose.Schema({
    puzzle: {type: mongoose.Schema.Types.ObjectId, ref: "Puzzle", required: true},
    player: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    secondsUsed: {type: Number, required: true},
    attemptsUsed: {type: Number, required: true}
}, {timestamps: true} );

const PlayRecord = mongoose.model("PlayRecord", playRecordSchema);

export {PlayRecord};
