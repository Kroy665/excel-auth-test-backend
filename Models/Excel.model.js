const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExcelSchema = new Schema({
    email: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
    },
    userId: { type: String, sparse: true  },
    path: [{ type: String, sparse: true }],
});

const Excel = mongoose.model("excel", ExcelSchema);
module.exports = Excel;
