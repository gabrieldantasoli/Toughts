const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

app.use(
    express.urlencoded({
        extended: true
    }),
);

app.use(express.json());

const hbs = exphbs.create({
    partialsDir: ['views/partials']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

conn
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));