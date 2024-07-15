const express = require ('express'); 
const routerMhs = require('./routers/mahasiswa')
const routerMk = require('./routers/matakuliah');
const routerNilai = require('./routers/nilai');
const app = express();
const port = 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routerMhs)
app.use(routerMk)
app.use(routerNilai)


app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`)
});