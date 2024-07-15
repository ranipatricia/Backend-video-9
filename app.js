const express = require('express')
const app = express();
const session = require('express-session');
const port = 5000;
const mysql = require('mysql2')

//untuk menerima rq.body
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//koneksi database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'kuliah'
});

connection.connect(error => {
    if (error) throw error;
    console.log('terhubung ke database kuliah');
})

//konfigurasi session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

//middleware untuk autentikasi
const authenticate = (req, res, next) => {
    if (req?.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send('Tidak Terautentikasi');
    }
};

//register
app.post('/register', (req, res) => {
    const { username, password} = req.body;
    connection.query(`INSERT INTO user Value ('${username}',PASSWORD('${password}'))`,
        (error, results) => {
            if (error) throw error;
            res.json({ message: 'Data Berhasil Ditambahkan', id: results.insertId});
    });
});

//login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    connection.promise().query(`SELECT * FROM user WHERE username = '${username}'
                                AND password = PASSWORD('${password}')`)
    .then((results) => {
        if (results.length > 0) {
            req.session.isAuthenticated= true;
            res.json({ message: 'Berhasil Login'});
        } else {
            res.status(401).send('Username atau password salah');
        }
    })
});


//route logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            res.send('logout');
        }
    });
});

//route get uang membutuhkan autentikasi
app.get('/rani', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (GET)');
});
app.post('/rani', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (POST)');
});
app.put('/rani', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (PUT)');
});
app.delete('/rani', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (DELETE)');
});

app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`)
})