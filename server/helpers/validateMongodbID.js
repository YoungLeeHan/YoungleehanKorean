import mongoose from "mongoose";

const validateMongodbId = (id) => {
    try {
        mongoose.Types.ObjectId.isValid(id);
    } catch (err) {
        console.log(err);
    }
};

export { validateMongodbId };
