const connection = require('./../db/db')

module.exports = {
    getNilaiByNim: (req, res) => {
        const nim = req.params.nim
        const qstring = `SELECT matakuliah.kd_mk, matakuliah.matakuliah, nilai.dosen,
                                matakuliah.sks, nilai.semester, nilai.nilai
                        FROM nilai
                        INNER JOIN matakuliah 
                        ON matakuliah.kd_mk = nilai.kd_mk
                        WHERE nilai.nim = ${req.params.nim};`; 
        connection.query(qstring, (err, data) => {
            if (err){
                console.log("error", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat Get data"
                });
            }
            else res.send(data)
        });
    },

    postNilai : (req, res) => {
        const {nim, kd_mk, semester, dosen, nilai} = req.body;
        const qstring = `INSERT INTO nilai (nim, kd_mk, semester, dosen, nilai)
                        VALUES (?, ?, ?, ?, ?)`;
        const values = [nim, kd_mk, semester, dosen, nilai];

        connection.query(qstring, values, (err, data) => {
            if (err) {
                console.log("error : ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat menambahkan data"
                });
            }
            else res.send(data)
        });
    },

    putNilai: (req,res) => {
        const {nim, kd_mk, semester, dosen, nilai} = req.body;
        const qstring = `UPDATE nilai
                        SET dosen = ?, nilai = ?
                        WHERE nim = ? AND kd_mk = ? AND semester = ?;`;
        const values = [dosen, nilai, nim, kd_mk, semester];

        connection.query(qstring, values, (err, data) => {   
            if (err) {
                console.log("error : ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengupdate data"
                });
            }
            else res.send(data)   
        });
    },

    deleteNilai: (req, res) => {
        const {nim, kd_mk, semester} = req.body;
        const qstring = `DELETE FROM nilai
                        WHERE nim = ? AND kd_mk = ? AND semester = ?;`;
        const values = [nim, kd_mk, semester];

        connection.query(qstring, values, (err, data) => {
            if (err) {
                console.log("error : ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat menghapus data"
                });
            }
            else res.send(data)
        }) 
    }
}