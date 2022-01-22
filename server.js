const express = require('express');
// const fileUpload = require('express-fileupload');
const app = express();
const multer = require('multer');


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/client/public/uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '---' + file.originalname)
    }
});

const upload = multer({ storage: fileStorageEngine });

// app.use(fileUpload());

// Upload Endpoint
app.post('/upload', upload.array("files"), (req, res) => {
    // if (req.files == null) {
    //     return res.status(400).json({ msg: "No file uploaded" });
    // }
    console.log(req.files);
    res.send("single file upload")

    // console.log(req.files);


    // const file = req.files.file;

    // file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).send(err);
    //     }

    //     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    // });
});

app.listen(5000, () => console.log('Server Started...'));