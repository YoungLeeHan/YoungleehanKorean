import productImage from "../models/productImage.js";
import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
    destination: "./public/images/product/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (extname) {
        return cb(null, true);
    } else {
        cb("Error: Please images only.");
    }
}

// 이미지 업로드 핸들러
export const uploadMultiImages = upload.array("multipleImages");

export const processImages = async (req, res, next) => {
    const files = req.files;

    if (!files) {
        return res.status(400).json({ error: "Please select images." });
    }

    try {
        for (const file of files) {
            let url = file.path.replace("public", "");

            const img = await productImage.findOne({ imgUrl: url });
            if (img) {
                console.log("Duplicate Image.");
            } else {
                await productImage.create({ imgUrl: url });
            }
        }

        console.log("multiple image files uploaded");
        console.log(files);
        res.redirect("/api/products");
    } catch (err) {
        console.error("ERROR: " + err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// 미스터리 부분
// app.get('/upload', (req,res)=> {
//     res.render('upload');
// });
//
// app.get('/productImage', (req, res)=>{
//     Picture.find({})
//         .then(images => {
//             res.render('index', {images : images});
//         });
// });

//
//
// app.post('/uploadmultiple', upload.array('multipleImages'),(req, res, next)=> {
//     const files = req.files;
//     if(!files) {
//         return console.log('Please select images.');
//     }
//
//     files.forEach(file => {
//         let url = file.path.replace('public', '');
//
//         Picture.findOne({imgUrl : url})
//             .then(async img => {
//                 if(img) {
//                     return console.log('Duplicate Image.');
//                 }
//                 await Picture.create({imgUrl : url});
//
//             })
//             .catch(err => {
//                 return console.log('ERROR: '+err);
//             })
//     });
//     console.log(files)
//     res.redirect('/productImageView');
//
// });
