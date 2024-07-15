const express = require('express');
const routerMk = express.Router();
const ctrMk = require("../controllers/matakuliah")

// Endpoint untuk matakuliah
routerMk.get('/matakuliah', ctrMk.getMk );
routerMk.get('/matakuliah/:kdMk', ctrMk.getBykdMk);
routerMk.post('/matakuliah', ctrMk.postMk);
routerMk.put('/matakuliah/:kdMk', ctrMk.updateMk);
routerMk.delete('/matakuliah/:kdMk', ctrMk.deleteMk);

module.exports = routerMk