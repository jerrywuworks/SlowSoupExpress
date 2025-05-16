import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import path from 'path'
import dotenv from "dotenv"
import { fileURLToPath } from 'url';

import {User} from "./schemas/user.mjs";
import {Puzzle} from "./schemas/puzzle.mjs";
import {PlayRecord} from "./schemas/playRecord.mjs";
import {Liked, Favorites, Saved} from "./schemas/bookmark.mjs";

import connectDB from "./db.mjs";

import authRouter from "./routes/auth.mjs"
import createRouter from "./routes/create.mjs";
import playRouter from "./routes/puzzle.mjs";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: "dev-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DSN}),
}));
app.use(passport.authenticate('session'));

connectDB()

app.listen(process.env.PORT || 3000);


/* --- Login and Sign Up --- */
app.use("/", authRouter);

/* --- Create Puzzle --- */
app.use("/", createRouter);


/* --- Play Puzzle --- */
app.use("/", playRouter)

/* --- Main Page */
app.get("/", async (req, res) => {
    const puzzles = await Promise.all (
        ( await Puzzle.find({}) )
        .map( async (puzzle) => {
            puzzle.authorName = ( await User.findOne({ _id: puzzle.author }) ).username ;
            puzzle.webTitle = puzzle.title.replaceAll(" ", "-")
            return puzzle;
        })
    );
       
    
    if (req.user){
        return res.render("index", {user: req.user, puzzles: puzzles});
    }
    return res.render("index", {puzzles: puzzles});
});

/* --- User and Bookmarks --- */
app.get("/user/:username", async (req, res) => {
    return res.render("user", {});
});

app.get("/user/:username/saved", async (req, res) => {
    return res.render("user-saved", {});
});

app.get("/user/:username/liked", async (req, res) => {
    return res.render("user-liked", {});
});

app.get("/user/:username/favorites", async (req, res) => {
    return res.render("user-favorites", {});
});


