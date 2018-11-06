const express = require('express');
const app = express();
const passportSetup = require('./passport');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const passport = require('passport');
const port = process.env.PORT || 5000;
console.log('port is: ', port);
const { spawn, exec, execFile } = require('child_process');
const fs = require('fs');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(passport.initialize());
app.use(passport.session());
const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.get("/auth", passport.authenticate('gitlab'));
app.get("/auth/gitlab", passport.authenticate('gitlab'), (req, res) => {
    console.log("now reached here", req)
    const authCode = req.query.code;
    res.redirect("http://localhost:3000/newApp?token=" + authCode);
})


app.post("/deploy", (req, res) => {
    const body = req.body;
    const url = Object.keys(body)[0];
    const fs = require('fs');
    const folder = "gitDirectories";
    fs.stat(folder, (err, stats) => {
        if (err) {
            fs.mkdirSync(`./${folder}`);
        }
        const repo = url.split("/").pop().toLowerCase();
        const ls = spawn(`./script.sh`, [url, repo]);
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
    res.json(url);
})



app.get("/apps", (req, res) => {
    res.send("view all existing apps")
})