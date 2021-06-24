const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();


app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

const pathFile = path.join(__dirname, 'db', 'db.json');

const data=fs.readFileSync(pathFile);
const allUsers = JSON.parse(data.toString());

/*let dataFile=null

fs.readFile(pathFile, (err, data) => {
    if (err) {
        console.log(err);
        return;                             // так не працює чогось
    }
    dataFile = JSON.parse(data.toString())
})
const allUsers = dataFile;*/

app.get('/users', (req, res) => {
    res.render('users', {allUsers});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/user/:userEmail', (req, res) => {
    const {userEmail} = req.params;
    const user = allUsers.find((value => value.email === userEmail));

    res.render('user', {user});
});

app.post('/register', (req, res) => {
    const {email} = req.body;
    const flag = allUsers.some((value => value.email === email));


    if (flag) res.redirect('/error');

    if (!flag) {
        const users = [];

        allUsers.forEach((value1) => {
            users.push(value1);
        })
        users.push(req.body);

        fs.writeFile(pathFile, JSON.stringify(users), (err => err && console.log(err)));

        res.redirect('/login');
    }
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const flag = allUsers.some((value => value.email === email && value.password === password));
    const user = allUsers.find((value => value.email === email));

    if (flag) res.redirect(`/user/${user.email}`);

    if (!flag) res.redirect('/register');

});

app.listen(3000, () => {
    console.log("3000");
});

