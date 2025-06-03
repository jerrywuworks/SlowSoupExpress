import express from "express"
import {Puzzle} from "../schemas/puzzle.mjs"
import { checkYesOrNo, getYesOrNo, checkSolution } from "../groq.mjs";

const playRouter = express.Router(); 

playRouter.get("/puzzle/:title", async (req, res) => {
    const puzzle = await Puzzle.findOne({ title: req.params.title.replaceAll("-", " ") })
    if (! puzzle) {
        return res.render("puzzle", {err: "Puzzle Not Found"});
    }
    return res.render("puzzle", { puzzle: puzzle, user: req.user })
});

// playRouter.post("/puzzle/:title", async (req, res) => {
//     return res.render("puzzle", {});
// });

playRouter.post("/puzzle/yes-no", async(req, res) => {
    const validityScore = await checkYesOrNo(req.body.question)
    console.log("validity: ", validityScore)

    if (validityScore < 50) {
        return res.json({valid: false })
    }
    const puzzle = await Puzzle.findOne( { title: req.body.puzzleTitle });

    const response = await getYesOrNo(req.body.question, puzzle.truth)
    return res.json({valid: true, response: response});
}) 


playRouter.post("/puzzle/check-solution", async(req, res) => {
    const puzzle = await Puzzle.findOne( { title: req.body.puzzleTitle });
    
    const matchingScore = await checkSolution(req.body.solution, puzzle.truth)
    console.log("matching score: ", matchingScore)
    // TODO: adjust score based on testing
    if (matchingScore < 75) {
        return res.json({match: false})
    }
    return res.json({ match: true, truth: puzzle.truth })
}) 

export default playRouter;