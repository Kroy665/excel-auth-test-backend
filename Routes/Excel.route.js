const express = require('express')
const router = express.Router()
const ExcelController = require('../Controllers/Excel.Controller')
const upload = require('../Middleware/upload')
// const multer = require('multer')
// var upload = multer({dest:'uploads/'});

router.get('/get-files', ExcelController.get) //

router.get('/get-file/:id', ExcelController.getFile) //

router.post('/upload-file',upload.single('file'), ExcelController.upload) //

router.post('/edit-file/:id',upload.single('file'), ExcelController.edit)  //

router.delete('/delete-file/:id', ExcelController.delete) //

module.exports = router