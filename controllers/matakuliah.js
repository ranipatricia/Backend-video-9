const connection = require("../db/db")

module.exports ={
    getMk:(req, res) => {
        connection.query("SELECT * FROM matakuliah", (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengambil data matakuliah"
                });
            } else {
                res.send(data);
            }
        });
    },

    getBykdMk:(req, res) => {
        const kdMk = req.params.kdMk;
        connection.query(`SELECT * FROM matakuliah WHERE kdMk = '${kdMk}'`, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengambil data matakuliah"
                });
            } else {
                res.send(data);
            }
        });
    },

    postMk:(req, res) => {
        const matakuliahBaru = req.body;
        connection.query("INSERT INTO matakuliah SET ?", matakuliahBaru, (err) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat menyimpan data matakuliah"
                });
            } else {
                res.send(matakuliahBaru);
            }
        });
    },

    updateMk:(req, res) => {
        const kdMk = req.params.kdMk;
        const Mk = req.body;
        const qstring = `UPDATE matakuliah
                        SET matakuliah = '${Mk.matakuliah}', sks = '${Mk.sks}', semester = '${Mk.semester}'
                        WHERE kdMk = '${kdMk}'`;
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error update matakuliah with kdMk" + kdMk
                });
            } else if (data.afffectedRows === 0) {
                res.status(404).send({
                    message: `matakuliah dengan kdMk ${kdMk} tidak ditemukan`
                });
            } else {
                console.log("Update matakuliah: ", { kdMk: kdMk, ...Mk });
                res.send({ kdMk: kdMk, ...Mk });
            }
        });
    },

    deleteMk:(req, res) => {
        const kdMk = req.params.kdMk;
        const qstring = `DELETE FROM matakuliah WHERE kdMk = '${kdMk}'`;
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting matakuliah with kdMk: " + kdMk
                });
            } else if (data.afffectedRows === 0) {
                res.status(404).send({
                    message: `matakuliah dengan kdMk ${kdMk} tidak ditemukan.`
                });
            } else {
                res.send(`matakuliah dengan kdMk ${kdMk} telah terhapus`);
            }
        });
    },
}