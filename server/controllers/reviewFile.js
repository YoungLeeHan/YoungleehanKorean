import Review from "../models/review.js";
import SingleFile from "../models/singlefile.js";
import MultipleFile from "../models/multiplefile.js";

export const createReviewWithFiles = async (req, res) => {
    try {
        // 1. 리뷰 생성
        const { review, productId, rating } = req.body;
        const newReview = await Review.create({
            product: productId,
            user: req.user._id, // 사용자 ID를 어떻게 가져오는지에 따라 수정해야 하쥐.
            review,
            rating,
        });

        // 2. 리뷰 ID를 사용하여 파일과 연결
        if (req.body.singleFiles && req.body.singleFiles.length > 0) {
            // 단일 파일 연결
            await SingleFile.updateMany(
                { _id: { $in: req.body.singleFiles } },
                { $set: { review: newReview._id } }
            );
        }

        if (req.body.multipleFileIds && req.body.multipleFileIds.length > 0) {
            // 다중 파일 연결
            await MultipleFile.updateMany(
                { _id: { $in: req.body.multipleFileIds } },
                { $set: { review: newReview._id } }
            );
        }

        return res
            .status(200)
            .json({ success: true, message: "리뷰와 파일이 연결되었습니다." });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};
