import express from "express"
import {Puzzle} from "../schemas/puzzle.mjs"

const createRouter = express.Router(); 

createRouter.get("/create", (req, res) => {
    if (! req.user) {
        // force user to log in first
        return res.redirect("login");
    }
    return res.render("create", {user: req.user});
});

createRouter.post("/create", async (req, res) => {
    const title = req.body.title;
    const mystery = req.body.mystery;
    const truth = req.body.truth;

    // make sure title is unique
    if ( await Puzzle.findOne( { title: req.body.title } )) {
        return res.render("create", {message: "Title already exists. Choose a different one!"})
    }
    
    const newPuzzle = new Puzzle ( {
        title: title,
        mystery: mystery,
        truth: truth,
        author: req.user._id
    })
    
    await newPuzzle.save();
    return res.redirect("/");
});

export default createRouter;