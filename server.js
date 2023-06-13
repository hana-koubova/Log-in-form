const express = require('express');
const app = express();

const bodyParser = require('body-parser')

const session = require('express-session');
const store = new session.MemoryStore();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const secretInfo = { username: "Hana", password: "This@is*password487" };

const port = process.env.POR || 3001;

app.use(express.static('public'));
app.use(
    session ({
        secret: "randomStuff123",
        resave: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: "none" },
        saveUninitialized: false,
        store,
    })
);

app.post("/secret-info", (req, res, next) => {
    const { username, password } = req.body;
    if (secretInfo.password === password && secretInfo.username === username) {
        res.redirect('login.html')
    } else {
        res.status(400).send('login failed');
    }
});

app.listen(port, () => {
    console.log(`Listening to ${port}`);
})