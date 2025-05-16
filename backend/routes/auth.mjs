import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
import {User} from "../schemas/user.mjs"
const authRouter = express.Router();    // basically a modular express.app

// ps: specify usernameField so passport works in a sane way...
passport.use(new LocalStrategy( { usernameField: 'email' }, async (email, password, cb) => {
    try {
        const matchUser = await User.findOne({ email: sanitize( email.trim().toLowerCase() ) });
        
        if (!matchUser) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        if (bcrypt.compareSync(sanitize(password), matchUser.password)) {
            return cb(null, matchUser);         // automatically log in
        }
        else {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
    }
    catch (err){
        return cb(err);
    }
}));

authRouter.get('/login', function(req, res, next) {
    res.render('login');
});
  

authRouter.post('/login', passport.authenticate('local', {  // use LocalStrategy
    successRedirect: '/',
    failureRedirect: '/login'
}));

authRouter.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

authRouter.get('/signup', (req, res, next) => {
    res.render('signup');
});


authRouter.post('/signup', async (req, res, next) => {
    try{
        const email = sanitize(req.body.email.trim().toLowerCase());
        const password = sanitize(req.body.password);
        const repassword = sanitize(req.body.repassword);
        const username = sanitize(req.body.username);

        if (repassword !== password) {
            return res.render("signup", {message: "Passwords do not match"});
        }
        if (req.body.password.length < 8) {
            return res.render("signup", {message: "Password is too short"});
        }

        const duplicateUser = await User.findOne( { email : req.body.email });
        
        if ( duplicateUser !== null ) {
        return res.render("signup", {message : "Email is already in use"} );
        
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email: email,
            password: hash,
            username: username
        });
        await newUser.save();

        console.log("new user saved");
        // automatically log in
        req.login(newUser, (err) => {
            if (err) return next(err);
            return res.redirect('/');
        });
    }
    catch (err) {
        console.log(err);
        return res.render("signup", {message: err});
    }
});

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user._id );      // save db id to session
    });
  });
  
passport.deserializeUser(function(id, cb) { // retrieve actual user on each req
    process.nextTick( async function() {
        try {
            const matchUser = await User.findById(id);
            if (!matchUser) {
                return cb (null, false);
            }
            cb(null, matchUser);
        } catch (err) {
            cb(err);
        }
    });
});

export default authRouter;