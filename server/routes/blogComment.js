import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/auth.js";
// controllers
import {
    create,
    list,
    read,
    update,
    remove,
    like,
} from "../controllers/blogComment.js";

// 2. 특정 포스팅에 대한 코멘트 작성하기
// axios.post(`/blog/comment/create/${post._id}`, { user: {_id, name, ...}, content });
router.post("/", requireSignin, create);
// 1. 해당 포스팅에 대한 코맨트 리스트 가져오기     (내가 적었는지 확인할 수 있는 variable 필요)
// axios.get(`/blog/comment/list/${post._id}`);
router.get("/", requireSignin, list);
router.get("/:id", requireSignin, read);
// 4. 자신이 적은 코멘트 수정하기
// axios.put(`/blog/comment/change/${comment._id}`, {content})
router.put("/:id", requireSignin, update);
// 5. 자신이 적은 코멘트 삭제하기
// axios.delete(`blog/comment/deletion/${comment._id}`)
router.delete("/:id", requireSignin, remove);
// 3. 좋아요 버튼 누르면 likeCount 정보 수정하기
// axios.put(`/blog/comment/likeCount/${comment._id}`, {likeCount});
router.put("/likes", requireSignin, like);



export default router;
