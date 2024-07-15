const express = require('express');
const app = express();
const port = 5000;

//paramas 1
app.get('/mahasiswa/:nim', (req,res) => {
    const nim = req.params.nim

    res.send(`Mahasiswa dengan nim: ${nim} di temukan`);
});

//params 2
app.get('/mahasiswa/:nim/:semester', (req,res) => {

    const nim = req.params.nim
    const semester = req.params.semester

    res.send(`Mahasiswa dengan nim: ${nim} semester: ${semester} di temukan`);
});

//query
app.get('/nilai-persemester',(req,res)=> {
    const nim = req.query.nim
    const semester = req.query.semester

    res.send(`Mahasiswa dengan nim : ${nim} semester : ${semester} di temukan`);
});

app.use(express.json())

app.post('/mahasiswa', (req,res)=>{
    const nim = req.body.nim;
    const nama = req.body.nama;
    const angkatan = req.body.angkatan;
    const prodi = req.body.prodi;

    const msg = {status:"sukses",
                    data:{"nim": nim, "nama": nama, "angkatan": angkatan, "prodi": prodi}};
    res.send(msg);
})

// app.post('/', (req,res) => {
//     res.send(`Post Data`)
// });

// app.put('/', (req,res) => {
//     res.send(`Update data sukses`)
// });

// app.delete('/', (req,res) => {
//     res.send(`Hapus Data berhasil`)
// });

app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`);
})