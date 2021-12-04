const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage(({
    destination: function(req, file, cb){
        // console.log(file)
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        let name = path.basename(file.originalname)
        // console.log(ext)
        cb(null, name+Date.now()+ext)
    }
}))

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        let ext = path.extname(file.originalname)
        // console.log(file)
        if(ext==='.xlsx'){
            cb(null,true)
            // console.log(file)
        }else{
            console.log('Enter Excel file with .xlsx format...')
            cb(null,false)
        }
    },
    limits: {
        fileSize: 1024*1024*5
    }
})

module.exports = upload