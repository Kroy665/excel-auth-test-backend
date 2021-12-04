const createError = require("http-errors");
const Excel = require("../Models/Excel.model");
const User = require("../Models/User.model");
const fs = require("fs");

module.exports = {
    upload: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            console.log("0:", userId);
            const doesExist = await Excel.findOne({ userId: userId });
            if (doesExist) {
                await Excel.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            path: req.file.path,
                        },
                    }
                );
                console.log("1:", userId);
                res.send(req.file.path);
            } else {
                const user = await User.findById(userId);

                if (user) {
                    const excel = new Excel({
                        email: user.email,
                        userId: user._id,
                    });
                    const savedExcel = await excel.save();
                    if (savedExcel) {
                        await Excel.findOneAndUpdate(
                            { userId: user._id },
                            {
                                $push: {
                                    path: req.file.path,
                                },
                            }
                        );
                    }
                }


                
                res.send(req.file.path);
            }
        } catch (error) {
            next(error);
        }
    },

    get: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            const userData = await Excel.findOne({ userId: userId });
            if (userData) {
                const paths = userData.path;
                res.send(paths);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            next(error);
        }
    },
    getFile: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            const userData = await Excel.findOne({ userId: userId });
            if (userData) {
                const fileId = req.params["id"];
                // console.log(fileId);
                var file = `uploads/${fileId}.xlsx`;
                res.download(file);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            const userData = await Excel.findOne({ userId: userId });
            const fileId = req.params["id"];
            if (userData) {
                await Excel.updateOne(
                    { userId: userId },
                    {
                        $pull: {
                            path: `uploads\\${fileId}.xlsx`,
                        },
                    }
                );
                const filePath = `./uploads/${fileId}.xlsx`;
                fs.unlink(filePath, (error) => {
                    console.error(error);
                });

                await Excel.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            path: req.file.path,
                        },
                    }
                );

                res.send(req.file.path);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            const userData = await Excel.findOne({ userId: userId });
            const fileId = req.params["id"];
            if (userData) {
                await Excel.updateOne(
                    { userId: userId },
                    {
                        $pull: {
                            path: `uploads\\${fileId}.xlsx`,
                        },
                    }
                );
                const filePath = `./uploads/${fileId}.xlsx`;
                fs.unlink(filePath, (error) => {
                    console.error(error);
                });
                const user = await Excel.findOne({ userId: userId });
                res.send(user.path);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            next(error);
        }
    },
};
