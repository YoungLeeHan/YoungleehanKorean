import productImage from "../models/productImage.js";
import multer from "multer";
import path from "path";
import fs from "fs";


let storage = multer.diskStorage({
    destination: './public/images/product/',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

let upload = multer({
    storage : storage,
    fileFilter : (req, file, cb) => {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(extname) {
        return cb(null, true);
    } else {
        cb('Error: Please upload image file only.');
    }
}

export const getImage = async (req, res, next) => {
    try {
        const images = await productImage.find({});
        res.json(images);
    } catch (err) {
        console.error('ERROR: ' + err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Upload Image - Single

export const uploadSingleImage = upload.single('singleImage');

export const processSingleImage = async (req, res, next) => {
    const file = req.file;

    if (!file) {
        return console.log('please select an Image.');
    }
    let url = file.path.replace("public", "");

    productImage.create({imgUrl: url})
        .then(img => {
            console.log("image saved to DB");
            res.json(productImage)
        }).catch(err => {
        console.error('ERROR: ' + err);
        return res.status(500).json({error: 'Internal server error'});
    });
};

// Upload Image - Multiple

export const uploadMultiImages = upload.array('multipleImages');

export const processMultiImages = async (req, res, next) => {
    const files = req.files;

    if (!files) {
        return res.status(400).json({ error: 'Please select images.' });
    }
    try {
        for (const file of files) {
            let url = file.path.replace('public', '');

            const img = await productImage.findOne({ imgUrl: url });
            if (img) {
                console.log('Duplicate Image.');
            } else {
                await productImage.create({ imgUrl: url });
            }
        }

        console.log("multiple image files uploaded");
        res.json(productImage)
    } catch (err) {
        console.error('ERROR: ' + err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



export const deleteProductImages = async (req, res, next) => {
    let searchQuery = {_id : req.params.id};
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const projectRootDir = path.resolve(__dirname, '..');

    try {
        productImage.findOne(searchQuery)
            .then(img => {
                fs.unlink(projectRootDir+'/public'+img.imgUrl, (err)=>{
                    if(err) return console.log(err);
                    productImage.deleteOne(searchQuery)
                        .then(img => {
                            res.json(productImage)
                        })
                })
            })
    } catch (err) {
        console.error('ERROR: ' + err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}