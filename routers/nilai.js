const express = require('express');
const routerNilai = express.Router();
const ctrNilai = require("../controllers/nilai")

routerNilai.get('/nilai/:nim', ctrNilai.getNilaiByNim)
routerNilai.post('/nilai/:nim', ctrNilai.postNilai)
routerNilai.put('/nilai/:nim', ctrNilai.putNilai)
routerNilai.delete('/nilai/:nim', ctrNilai.deleteNilai)

module.exports = routerNilai
