import mongoose from "mongoose";

const validateMongodbId = (id) => {
<<<<<<< HEAD
    try {
        mongoose.Types.ObjectId.isValid(id);
    } catch (err) {
        console.log(err);
    }
=======
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error("The id is not valid or found");
>>>>>>> ff17569 (chore: nothing)
};

export { validateMongodbId };
