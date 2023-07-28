var express = require("express");
var router = express.Router();
const multer = require("multer");

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");
const setUpload = require("../Util/upload.js");

router.post("/submit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const CommunityPost = new Post(temp);
          CommunityPost.save().then((doc) => {
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/list", (req, res) => {
  let sort = {};

  if (req.body.sort === "최신순") {
    sort.createdAt = -1;
  } else {
    //인기순
    sort.repleNum = -1;
  }
  Post.find({
    $or: [
      { title: { $regex: req.body.searchTerm } },
      { content: { $regex: req.body.searchTerm } },
    ],
  })
    .populate("author")
    .sort(sort)
    .skip(req.body.skip) // 0, 5
    .limit(5) //한번에 찾을 doc 숫자
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .populate("author")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});
*/

router.post(
  "/image/upload",
  setUpload("react-community/post"),
  (req, res, next) => {
    res.status(200).json({ success: true, filePath: res.req.file.location });
  }
);

module.exports = router;
