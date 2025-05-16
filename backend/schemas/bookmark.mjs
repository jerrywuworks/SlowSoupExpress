import mongoose from "mongoose";
const bookmarkSchema = new mongoose.Schema({
    puzzle: {type: mongoose.Schema.Types.ObjectId, ref: "Puzzle", required: true},
    player: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true} );

const Liked = mongoose.model("Liked", bookmarkSchema);
const Saved = mongoose.model("Saved", bookmarkSchema);
const Favorites = mongoose.model("Favorite", bookmarkSchema);


export {Liked, Saved, Favorites};
