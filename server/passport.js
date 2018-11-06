const passport = require('passport');
var GitlabStrategy = require('passport-gitlab2').Strategy;
const keys = require('./config/keys');
const db = require('./db/db');
const { addUser } = require("./db/db.users");
db();

passport.serializeUser((profile, done) => {
    done(null, profile);
})

passport.deserializeUser((profile, done) => {
    done(null, profile);
})


passport.use(new GitlabStrategy({
    clientID: keys.googleKeys.clientID,
    clientSecret: keys.googleKeys.clientSecret,
    callbackURL: "http://localhost:5000/auth/gitlab"
},

    function (token, tokenSecret, profile, done) {
        const req_obj = { //it is user data to be saved in users table
            userId: profile.id,
            userName: profile.username,
            displayName: profile.displayName,
            email: profile._json.email,
            profileUrl: profile.profileUrl
        }
        const obs = addUser(req_obj);
        obs.subscribe(doc => console.log("subscribe ", doc));
        done(null, profile);
    }
));

